import { Injectable, NotFoundException } from '@nestjs/common';
import { Language } from './enums/language.enum';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        language: Language.en,
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        language: Language.en,
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        language: Language.en,
      },
    ];
  }

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }

  async findById(userId: number) {
    const user = this.users.find(user => user.userId === userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async changeLanguage(userId: number, language: Language) {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    user.language = language;

    return user;
  }
}
