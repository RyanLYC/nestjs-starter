import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Post()
  addUser(): any {
    // todo 解析Body参数
    const user = { username: 'lyc', password: '123456' } as User;
    // return this.userService.addUser();
    return this.userService.create(user);
  }

  @Get()
  getUsers(): any {
    return this.userService.findAll();
    // return this.userService.getUsers();
  }

  @Get('/profile')
  getUserProfile(): any {
    return this.userService.findProfile(2);
  }
}
