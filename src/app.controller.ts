import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities';
import { CreateUserDto } from './dtos/create-user-dto';
import { CreateTweetDto } from './dtos/create-tweet-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHealth();
  }

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  @HttpCode(200)
  signUp(@Body() createUserDto: CreateUserDto): User {
    const createdUser = this.appService.createUser(createUserDto);
    return createdUser;
  }

  @Post('/tweets')
  postTweet(@Body() createTweetDto: CreateTweetDto) {
    const createdTweet = this.appService.postTweet(createTweetDto);
    return createdTweet;
  }

  @Get('/tweets')
  getTweets(@Query('page') page: string) {
    const tweets = this.appService.getTweets(page);
    return tweets;
  }

  @Get('/tweets/:username')
  getTweetByUsername(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  }
}
