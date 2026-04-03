import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
  RequestTimeoutException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { verifyPassword } from 'src/common/utils/password.utils';
import { JwtService } from '@nestjs/jwt';
import { emit } from 'process';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
  ) {}
  isAuthenticated = false;
  public async login(loginDto: LoginDto) {
    //Find the user by email
    const user = await this.userService.getUserByUsername(loginDto.username);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    //Compare the password with the hashed password in the database
    const isPasswordValid = verifyPassword(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    //If the password is correct, generate a JWT token and return it
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );
    // Send the response
    return {
      message: 'Login successful',
      success: true,
      data: user,
      token,
    };
  }

  async signup(userData: CreateUserDto) {
    try {
      const user = await this.userService.createUser(userData);
      return {
        message: 'User created successfully',
        success: true,
        data: user,
      };
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'Database connection refused. Please try again later.',
        );
      }
      throw new InternalServerErrorException(
        'Failed to create user. Please try again later.',
      );
    }
  }
}
