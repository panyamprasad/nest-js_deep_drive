/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly isLocal =
    (process.env.IS_LOCAL || '').trim().toLowerCase() === 'true';
  private sns = new SNSClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials:
      process.env.IS_LOCAL === 'true'
        ? undefined
        : {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
  });

  async publishEmail(emailData: { to: string; subject: string; body: string }) {
    const { to, subject, body } = emailData ?? {};
    const isLocal = this.isLocal;

    this.logger.log(`Test: ${isLocal ? 'local/smtp' : 'AWS/SNS'}`);
    this.logger.log(`IS_LOCAL = "${process.env.IS_LOCAL}" parsed=${isLocal}`);

    if (!to || !subject || !body) {
      this.logger.warn('Missing required data', emailData as any);
      return { ok: false, error: 'Missing required fields: to, subject, body' };
    }
    if (isLocal) {
      try {
        const info = await this.sendEmailSMTP(to, subject, body);
        return { ok: true, mode: 'local', messageId: info.messageId };
      } catch (err) {
        this.logger.error('Local SMTP send failed', err);
        return { ok: false, error: 'SMTP send failed' };
      }
    } else {
      try {
        const output = await this.sns.send(
          new PublishCommand({
            Message: JSON.stringify(emailData),
            TopicArn: process.env.SNS_TOPIC_ARN,
          }),
        );
        return { ok: true, mode: 'sns', messageId: output.MessageId };
      } catch (error) {
        console.error('Error publishing email to SNS:', error);
        return { ok: false, error: 'SNS publish failed' };
      }
    }
  }
  private sendEmailSMTP(to: string, subject: string, html: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    return transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
  }
}
