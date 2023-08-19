export class User {
  private _username: string;
  private _avatar: string;
  private _id: number;

  constructor(username: string, avatar: string, id: number) {
    this._username = username;
    this._avatar = avatar;
    this._id = id;
  }

  get username(): string {
    return this._username;
  }

  get avatar(): string {
    return this._avatar;
  }

  get id(): number {
    return this._id;
  }
}
