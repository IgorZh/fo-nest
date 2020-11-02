import { Language } from '../enums/language.enum';

export interface User {
  userId: number;
  username: string;
  password: string;
  language: Language;
}
