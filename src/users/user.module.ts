import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService,UserRepository],
  exports: [UserService]
})
export class UsersModule {}
