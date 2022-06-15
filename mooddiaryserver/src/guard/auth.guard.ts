import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies['jwt'];
      if (!jwt) {
        return false;
      }
      const userId = this.jwtService.verify(jwt).id;
      const userDB = await this.userService.getUserByID(userId);
      request.user = userDB;
      return true;
     
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
