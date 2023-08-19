export class Tweet {
  private _username: string;
  private _tweet: string;
  private _avatar: string;

  constructor(username: string, tweet: string, avatar: string) {
    this._username = username;
    this._tweet = tweet;
    this._avatar = avatar;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get tweet(): string {
    return this._tweet;
  }

  set tweet(tweet: string) {
    this._tweet = tweet;
  }

  get avatar() {
    return this._avatar;
  }
}
