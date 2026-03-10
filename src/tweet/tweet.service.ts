import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Tweet } from './tweet.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { Not } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) { }

  GetTweets(id: number) { }

  // public async createTweet(createTweetDto: CreateTweetDto) {
  //   const { userId, text } = createTweetDto;
  //   if (!userId || !text) {
  //     throw new Error(`UserId and Text are required to create a tweet`);
  //   }
  //   const user = await this.userService.getUserById(userId);
  //   if (!user) {
  //     throw new NotFoundException(`User with id ${userId} not found`);
  //   }
  //   try {
  //     const newTweet = this.tweetRepository.create({
  //       text: text,
  //       user: user,
  //     });
  //     const res = await this.tweetRepository.save(newTweet);
  //     return {
  //       tweet: res,
  //       message: 'Tweet created successfully',
  //     };
  //   } catch (error) {
  //     console.error('Error creating tweet:', error);
  //     throw new Error('Failed to create tweet');
  //   }
  // }
}
