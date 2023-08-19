import { Injectable } from '@nestjs/common';
import { Tweet } from '../entities/Tweet';

type IGenerateId = {
  _id: number;
  id: number;
};

const MAX_TWEET_PER_PAGE = 15;

@Injectable()
export class TweetsDatabase {
  private tweets: Tweet[];
  private idConstructor: IGenerateId;

  constructor() {
    this.tweets = [];
    this.idConstructor = {
      _id: this.tweets.length,
      get id() {
        return this._id++;
      },
    };
  }

  read(page: number): Tweet[] {
    if (page) {
      const offset = (page - 1) * MAX_TWEET_PER_PAGE;
      const limit = offset + MAX_TWEET_PER_PAGE;
      return this.tweets.slice(offset, limit);
    }

    return this.tweets.slice(-MAX_TWEET_PER_PAGE);
  }

  readOneByUserName(username: string): Tweet[] {
    return this.tweets.filter(
      (tweet) => tweet.username.toLowerCase() === username,
    );
  }

  create(tweet: Tweet): Tweet {
    this.tweets.push(tweet);
    return tweet;
  }

  generateId(): number {
    return this.idConstructor.id;
  }
}
