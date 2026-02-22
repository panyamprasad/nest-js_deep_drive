import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

//http://localhost:3000/users
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  getUsers(
    @Query() query: { gender?: string; isMarried?: string | boolean },
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log('limit : ', limit, 'page : ', page);
    if (query) {
      const usersData = this.usersService.getAllUsers();
      let filteredData = usersData;
      if (query.gender) {
        filteredData = filteredData.filter(
          (user) => user.gender === query.gender,
        );
      }
      if (query.isMarried) {
        const isMarriedBool =
          typeof query.isMarried === 'string'
            ? query.isMarried.toLowerCase() === 'true'
            : query.isMarried === true;
        filteredData = filteredData.filter(
          (user) => user.isMarried === isMarriedBool,
        );
      }
      return filteredData;
    }
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: any) {
    console.log(typeof id, id);
    return this.usersService.getUserById(+id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return 'A new user has been created!';
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: any, @Body() user: UpdateUserDto) {
    return 'User updated successfully!';
  }
}
