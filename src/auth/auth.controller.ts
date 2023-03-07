import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { createUserDto, logInDto } from 'src/users/dto/dtos';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { currentUser } from './current-user.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() req: createUserDto) {
    return this.authService.signUp(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return this.authService.getUsers();
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async logIn(
    @currentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.signIn(user, res);
    return 'Succesfully signed in'
  }

}
