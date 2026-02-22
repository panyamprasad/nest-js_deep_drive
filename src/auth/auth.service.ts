import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  isAuthenticated = false;
  login(email: string, password: string) {
    const user = this.userService.users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      return { message: 'Invalid email or password' };
    }
    this.isAuthenticated = true;
    return {
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
