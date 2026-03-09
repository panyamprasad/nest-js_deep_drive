import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(24, { message: 'Username must be at most 24 characters long' })
  username: string | undefined;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(150, { message: 'Email must be at most 150 characters long' })
  email: string | undefined;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  password: string | undefined;
}
