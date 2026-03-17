import { Module } from '@nestjs/common';
import { HashTagController } from './hash-tag.controller';
import { HashTagService } from './hash-tag.service';
import { HashTag } from './hash-tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  controllers: [HashTagController],
  providers: [HashTagService],
  imports: [TypeOrmModule.forFeature([HashTag])],
})
export class HashTagModule {}
