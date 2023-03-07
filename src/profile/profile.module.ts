import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/user.module';
import { UserRepository } from 'src/users/user.repository';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Profile,User]), UsersModule],
  exports: [ProfileService],
  providers: [ProfileService, ProfileRepository, UserRepository],
  controllers: [ProfileController],
})
export class ProfileModule {}
