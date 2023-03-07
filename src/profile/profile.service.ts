import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/users/user.repository';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private createProfile() {
    const newProfile = this.profileRepository.create();
    return this.profileRepository.save(newProfile);
  }
  private updateProfile(user: User) {
    return this.userRepository.save(user);
  }

  async createProfileOrUpdate(user: User) {
    const userFound = await this.userRepository.findOne({where: {email: user.email}, relations: ['profile']})
    if (!userFound.profile) {
      userFound.profile = await this.createProfile();
      return this.updateProfile(userFound);
    }
    return this.updateProfile(userFound);
  }
}
