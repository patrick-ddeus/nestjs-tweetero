import { User } from '../entities/User';
import { Injectable } from '@nestjs/common';

type IGenerateId = {
  _id: number;
  id: number;
};

@Injectable()
export class UserDatabase {
  private users: User[];
  private idConstructor: IGenerateId;

  constructor() {
    this.users = [];
    this.idConstructor = {
      _id: this.users.length,
      get id() {
        return this._id++;
      },
    };
  }

  read(): User[] {
    return this.users;
  }

  readOneUser(username: string): User {
    return this.users.find((user) => user.username === username);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  generateId(): number {
    return this.idConstructor.id;
  }
}
