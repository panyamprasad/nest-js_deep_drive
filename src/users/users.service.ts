/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/profile.entity';
import {
  generateRandomPassword,
  hashPassword,
} from 'src/common/utils/password.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(userData: CreateUserDto) {
    // Validate the incoming user data if a user with the same email already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      const isEmail = existingUser.email === userData.email;
      const isUserName = existingUser.username === userData.username;

      if (isEmail && isUserName) {
        throw new BadRequestException(
          'User with both this email and username already exists.',
        );
      }
      if (isEmail) {
        throw new BadRequestException('User with this email already exists.');
      }
      if (isUserName) {
        throw new BadRequestException(
          'User with this username already exists.',
        );
      }
    }

    // Generate the password for the user
    const randomPassword = userData.password
      ? userData.password
      : generateRandomPassword(12);
    const hashedPassword = await hashPassword(randomPassword);

    try {
      const newUser = this.userRepository.create({
        ...userData,
        profile: userData.profile ?? {},
        password: hashedPassword,
      });
      const res = await this.userRepository.save(newUser);
      return {
        user: res,
        message: 'User created successfully',
        password: randomPassword,
      };
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occurred, please try again',
          {
            description: 'Could not connect the database.',
          },
        );
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  public async deleteUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return { message: `User with id ${id} not found` };
    }

    try {
      const deleteUser = await this.userRepository.delete(id);
      if (deleteUser.affected === 0) {
        return { message: `Failed to delete user with id ${id}` };
      }
      return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  public async getAllUsers() {
    console.log(this.configService.get<string>('ENV_MODE'));
    try {
      const users = await this.userRepository.find({
        relations: {
          profile: true,
        },
      });
      if (users.length === 0) {
        return { message: 'No Users Found' };
      }
      return users;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occured, please try again',
          {
            description: 'Could not connect the database.',
          },
        );
      }
    }
  }

  public async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        //Handle the customException
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `The User with id ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
          {
            description:
              'The exception occured because a user with ID not found.',
          },
        );
      }
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occured, please try again',
          {
            description: 'Could not connect the database.',
          },
        );
      }
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user by id');
    }
  }

  public async getUserByUsername(username: string) {
    try {
      const user = await this.userRepository.findOneBy({ username });
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      return user;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has occured, please try again',
          {
            description: 'Could not connect the database.',
          },
        );
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch user by username',
      );
    }
  }
}
