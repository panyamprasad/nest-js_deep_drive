import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTweetDto {
    @IsNotEmpty()
    @IsString()
    text: string | undefined;

    @IsOptional()
    image?: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
