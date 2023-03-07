import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createUserDto, logInDto } from './dto/dtos';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // // //todo add dto and types
  private async validateEmail(req: createUserDto) {
    let user: User;
    user = await this.userRepository.findOne({ where: { email: req.email } });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
  async validateUser(cred: logInDto) {
    const { email, password: givenPassword } = cred;
    const user = await this.userRepository.findOne({ where: { email: email }, select: ['email','password','id'] });
    if (!user) {
      throw new NotFoundException('user with this email not found');
    }
    const { password, ...rest } = user;
    const passwordIsValid = await bcrypt.compare(givenPassword, password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Password wrong');
    }
    return rest;
  }

  // async getUserByFilter(userArgs: Partial<User>) {
  //   return this.userRepository.findOne({});
  // }

  async getAllUsers() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.email', 'user.id','user.username'])
      .getMany();
    return users;
  }

  async createUser(req: createUserDto) {
    await this.validateEmail(req);
    const user = this.userRepository.create({
      password: await bcrypt.hash(req.password, 10),
      email: req.email,
      username: req.username
    });
    const { password, ...rest } = await this.userRepository.save(user);
    return rest;
  }
}
