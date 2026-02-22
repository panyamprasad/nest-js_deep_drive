import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly userService: UsersService) {}
  tweets: {
    id: number;
    context: string;
    date: Date;
  }[] = [
    {
      id: 101,
      context: 'This is my first tweet',
      date: new Date('2023-01-01'),
    },
    {
      id: 102,
      context: 'This is my second tweet',
      date: new Date('2023-01-02'),
    },
    {
      id: 101,
      context: 'This is my third tweet',
      date: new Date('2023-01-03'),
    },
    {
      id: 102,
      context: 'This is my fourth tweet',
      date: new Date('2023-01-04'),
    },
  ];

  GetTweets(id: number) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    const tweets = this.tweets.filter((tweet) => tweet.id === id);
    const response = tweets.map((tweet) => {
      return {
        context: tweet.context,
        data: tweet.date,
        user: {
          name: user.name,
          userId: user.id,
        },
      };
    });
    return response;
  }
}
