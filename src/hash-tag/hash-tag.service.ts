import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashTag } from './hash-tag.entity';

@Injectable()
export class HashTagService {
  constructor(
    @InjectRepository(HashTag)
    private readonly hashTagRepository: Repository<HashTag>,
  ) {}

  public async createHashTag(name: string) {
    if (!name) {
      throw new Error('HashTag name is required');
    }
    try {
      const existingHashTag = await this.hashTagRepository.findOne({
        where: { name },
      });
      if (existingHashTag) {
        return { message: 'HashTag with this name already exists' };
      }
      const newHashTag = this.hashTagRepository.create({ name });
      const res = await this.hashTagRepository.save(newHashTag);
      return {
        hashTag: res,
        message: 'HashTag created successfully',
      };
    } catch (error) {
      console.error('Error creating hash tag:', error);
      throw new Error('Failed to create hash tag');
    }
  }
}
