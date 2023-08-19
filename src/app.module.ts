import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserDatabase } from './database/user-db';
import { TweetsDatabase } from './database/tweets-db';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, UserDatabase, TweetsDatabase],
})
export class AppModule {}
