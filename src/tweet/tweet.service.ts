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
  ) {}

  public async GetTweets(id: number) {
    if (!id) {
      throw new NotFoundException(`User id is required to fetch tweets`);
    }
    try {
      const result = await this.tweetRepository.find({
        where: { user: { id } },
      });
      if (!result || result.length === 0) {
        return {
          message: `No tweets found for user with id ${id}`,
          tweets: [],
        };
      }
      return result;
    } catch (error) {
      console.error('Error fetching tweets:', error);
      throw new Error('Failed to fetch tweets');
    }
  }

  public async createTweet(createTweetDto: CreateTweetDto) {
    const { userId, text } = createTweetDto;
    if (!userId || !text) {
      throw new Error(`UserId and Text are required to create a tweet`);
    }
    const userResult = await this.userService.getUserById(userId);
    if (
      !userResult ||
      typeof userResult !== 'object' ||
      !('id' in userResult)
    ) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const user: User = userResult as User;
    try {
      const newTweet = this.tweetRepository.create({
        text,
        user,
      });
      const res = await this.tweetRepository.save(newTweet);
      return {
        tweet: res,
        message: 'Tweet created successfully',
      };
    } catch (error) {
      console.error('Error creating tweet:', error);
      throw new Error('Failed to create tweet');
    }
  }
}
