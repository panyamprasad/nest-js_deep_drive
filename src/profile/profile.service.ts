import { Injectable } from '@nestjs/common';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  getProfile() {
    try {
      return this.profileRepository.find({
        relations: {
          user: true,
        },
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to fetch profile');
    }
  }
}
