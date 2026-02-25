/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  public async createUser(userData: CreateUserDto) {
    // Validate the incoming user data if a user with the same email already exists
    const user = await this.userRepository.findOne({
      where: {
        email: userData.email,
      }
    })

    //Handle the case where a user with the same email already exists
    if(user){
      return { message: 'User with this email already exists' };
    }

    // Create a new user entity and save it to the database
    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  getUserById() {
    // return this.userRepository.findOneBy({ id });
  } 
  
}
