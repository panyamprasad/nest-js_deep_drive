/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/profile.entity';
import {
  generateRandomPassword,
  hashPassword,
} from 'src/common/utils/password.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  public async createUser(userData: CreateUserDto) {
    // Validate the incoming user data if a user with the same email already exists
    const user = await this.userRepository.findOne({
      where: {
        email: userData.email,
      },
    });
    if (user) {
      return { message: 'User with this email already exists' };
    }
    // Generate the password for the user
    const randomPassword = generateRandomPassword();
    const hashedPassword = hashPassword(randomPassword);
    try {
      userData.profile = userData.profile ?? {};
      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
      const res = await this.userRepository.save(newUser);
      return {
        user: res,
        message: 'User created successfully',
        password: randomPassword,
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
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
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  public async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        return {
          message: `User with id ${id} not found`,
        };
      }
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      console.error('Error fetching user by id:', error);
      throw new Error('Failed to fetch user by id');
    }
  }
}
