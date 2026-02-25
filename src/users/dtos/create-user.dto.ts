import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First Name must be a string' })
  @MinLength(3, { message: 'First Name must be at least 3 characters long' })
  @IsNotEmpty({ message: 'First Name is required' })
  firstName: string | undefined;

  @IsString({ message: 'Last Name must be a string' })
  @MinLength(3, { message: 'Last Name must be at least 3 characters long' })
  @IsNotEmpty({ message: 'Last Name is required' })
  lastName: string | undefined;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string | undefined;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string | undefined;
}
