import * as crypto from 'crypto';

export function generateRandomPassword(length: number = 12) {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return `${salt}:${hash}`; // ONE value
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, correctHash] = hash.split(':');
  const newHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  console.log('New Hash:', newHash);
  console.log('Correct Hash:', correctHash);
  return newHash === correctHash;
}
