import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateProfileDto } from 'src/profile/dtos/create-profile.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(24, { message: 'Username must be at most 24 characters long' })
  username: string | undefined;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(150, { message: 'Email must be at most 150 characters long' })
  email: string | undefined;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  password?: string;

  @IsOptional()
  profile: CreateProfileDto | undefined;
}
