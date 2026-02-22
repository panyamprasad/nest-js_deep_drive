/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService) { }
  users: {
    id: number;
    name: string;
    gender: string;
    email: string;
    isMarried: boolean;
    password?: string;
  }[] = [
      {
        id: 101,
        name: 'John Doe',
        gender: 'male',
        email: 'john@example.com',
        isMarried: true,
        password: 'john123',
      },
      {
        id: 102,
        name: 'Jane Smith',
        gender: 'female',
        email: 'jane@example.com',
        isMarried: false,
        password: 'jane123',
      },
      {
        id: 103,
        name: 'Alice Johnson',
        gender: 'female',
        email: 'alice@example.com',
        isMarried: true,
        password: 'alice123',
      },
      {
        id: 104,
        name: 'Raddu',
        gender: 'male',
        email: 'raddu@example.com',
        isMarried: true,
        password: 'raddu123',
      },
      {
        id: 105,
        name: 'Alice',
        gender: 'female',
        email: 'alice2@example.com',
        isMarried: false,
        password: 'alice123',
      },
      {
        id: 106,
        name: 'Johnson',
        gender: 'male',
        email: 'johnson@example.com',
        isMarried: false,
        password: 'johnson123',
      },
    ];

  getAllUsers() {
    if (!this.authService.isAuthenticated) {
      throw new Error('Unauthorized');
    }
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    name: string;
    gender: string;
    age: number;
    isMarried: boolean;
    password: string;
  }) {
    this.users.push({
      id: this.users.length + 1,
      ...user,
      email: '',
    });
    return 'A new user has been created!';
  }
}
