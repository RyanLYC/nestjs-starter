import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers(): any {
    console.log('getUsers');
    return { code: 0, data: [], msg: 'success' };
  }
}
