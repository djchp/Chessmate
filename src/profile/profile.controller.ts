import { Controller, Patch } from '@nestjs/common';
import { Body, UseGuards } from '@nestjs/common/decorators';
import { currentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/user.entity';
import { CurentUserType } from 'src/utils/types';
import { ProfileUpData } from './dto/dtos';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  async createOrUpdate(
    @currentUser() dataInJwt: CurentUserType,
    @Body() data: ProfileUpData,
  ) {
    return this.profileService.createProfileOrUpdate(dataInJwt.user, data);
  }
}
