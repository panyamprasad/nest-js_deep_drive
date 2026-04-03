import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //http://localhost:3000/auth/signin
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  //http://localhost:3000/auth/signup
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() userData: CreateUserDto) {
    return await this.authService.signup(userData);
  }
}
