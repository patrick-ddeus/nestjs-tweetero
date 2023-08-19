import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserDatabase } from './database/user-db';
import { CreateUserDto } from './dtos/create-user-dto';
import { User, Tweet } from './entities';
import { CreateTweetDto } from './dtos/create-tweet-dto';
import { TweetsDatabase } from './database/tweets-db';

@Injectable()
export class AppService {
  constructor(
    private readonly userDatabase: UserDatabase,
    private readonly tweetsDatabase: TweetsDatabase,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getHealth(): string {
    return "I'm okay!";
  }

  createUser(user: CreateUserDto): User {
    const userInstance = new User(
      user.username,
      user.avatar,
      this.userDatabase.generateId(),
    );
    const createdUser = this.userDatabase.create(userInstance);

    return createdUser;
  }

  postTweet(tweet: CreateTweetDto) {
    const user = this.userDatabase.readOneUser(tweet.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const tweetInstance = new Tweet(tweet.username, tweet.tweet, user.avatar);

    const createdTweet = this.tweetsDatabase.create(tweetInstance);

    return createdTweet;
  }

  getTweets(page: string) {
    const numberPage = parseInt(page);

    if (this.pageQueryIsValid(numberPage)) {
      throw new BadRequestException();
    }

    const tweets = this.tweetsDatabase.read(numberPage);

    return this.replaceTweetsUnderscore(tweets);
  }

  pageQueryIsValid(page: number) {
    return (page && isNaN(page)) || page < 1;
  }

  getTweetsByUser(username: string) {
    const tweets = this.tweetsDatabase.readOneByUserName(username);

    if (tweets.length === 0) {
      return [];
    }

    return this.replaceTweetsUnderscore(tweets);
  }

  replaceTweetsUnderscore(tweets: Tweet[]) {
    return tweets.map((tweet) => ({
      avatar: tweet.avatar.replace('_', ''),
      username: tweet.username.replace('_', ''),
      tweet: tweet.tweet.replace('_', ''),
    }));
  }
}
