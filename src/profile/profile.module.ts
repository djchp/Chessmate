import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [ConfigService, TypeOrmModule.forFeature([Profile])],
  exports: [ProfileService],
  providers: [ProfileService, ProfileRepository],
  controllers: [ProfileController],
})
export class ProfileModule {}
