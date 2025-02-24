import { Controller, Get, Post, Logger } from '@nestjs/common';
import { UserService } from './user.service';
// import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    // private configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.logger.log('UserController init');
  }

  @Post()
  addUser(): any {
    // todo 解析Body参数
    const user = { username: 'lyc', password: '123456' } as User;
    // return this.userService.addUser();
    return this.userService.create(user);
  }

  @Get()
  getUsers(): any {
    this.logger.log(`请求getUsers成功`);
    this.logger.warn(`请求getUsers成功`);
    this.logger.error(`请求getUsers成功`);
    return this.userService.findAll();
    // return this.userService.getUsers();
  }

  @Get('/profile')
  getUserProfile(): any {
    return this.userService.findProfile(2);
  }
}
