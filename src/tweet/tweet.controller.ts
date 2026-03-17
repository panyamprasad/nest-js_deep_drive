import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dtos/create-tweet.dto';

//http://localhost:3000/tweet
@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  //http://localhost:3000/tweet/101
  @Get(':userId')
  public GetTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.GetTweets(userId);
  }
  @Post()
  public createTweet(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(createTweetDto);
  }
}
