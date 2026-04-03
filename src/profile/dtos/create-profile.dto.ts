/* eslint-disable prettier/prettier */
import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateProfileDto {
  @IsString({ message: 'First Name must be a string' })
  @IsOptional()
  @MinLength(3, { message: 'First Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'First Name must be at most 100 characters long' })
  firstName?: string;

  @IsString({ message: 'Last Name must be a string' })
  @IsOptional()
  @MinLength(3, { message: 'Last Name must be at least 3 characters long' })
  @MaxLength(100, { message: 'Last Name must be at most 100 characters long' })
  lastName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  gender?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}
