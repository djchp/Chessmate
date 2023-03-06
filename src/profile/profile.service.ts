import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  private createProfile() {
    const newProfile = this.profileRepository.create();
    return this.profileRepository.save(newProfile);
  }
  private updateProfile(user: User) {
    //todo
  }

  async createProfileOrUpdate(user: User) {
    if (!user.profile) {
      user.profile = await this.createProfile();
      return this.updateProfile(user);
    }
    return this.updateProfile(user);
  }
}
