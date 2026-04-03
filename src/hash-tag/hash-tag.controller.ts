import { Body, Controller, Post } from '@nestjs/common';
import { HashTagService } from './hash-tag.service';
import { CreateHashTagDto } from './dtos/create-hash-tag.dto';

@Controller('hash_tag')
export class HashTagController {
  constructor(private readonly hashTagService: HashTagService) {}

  @Post()
  public async createHashTag(@Body() createHashTagDto: CreateHashTagDto) {
    try {
      const result = await this.hashTagService.createHashTag(
        createHashTagDto.name,
      );
      return result;
    } catch (error) {
      console.error('Error in HashTagController:', error);
      throw new Error('Failed to create hash tag');
    }
  }
}
