import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TweetService } from './tweet.service';

//http://localhost:3000/tweet
@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  //http://localhost:3000/tweet/101
  @Get(':userId')
  public GetTweets(@Param('userId', ParseIntPipe) userId: number) {
    return this.tweetService.GetTweets(userId);
  }
}
