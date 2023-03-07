import {
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { createUserDto, logInDto } from 'src/users/dto/dtos';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(req: createUserDto) {
    const createdUser = await this.userService.createUser(req);
    return createdUser;
  }
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  async signIn(user: Partial<User>, res: Response) {
    const expires = new Date();
    expires.setSeconds(
      this.configService.get('JWT_EXPIRATION'),
    );
    const at = this.jwtService.sign({user: user});

    res.cookie('Authentication', at, {
      httpOnly: true,
      expires,
    });
    
  }
}
