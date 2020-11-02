import { IsEnum } from 'class-validator';
import { Language } from '../enums/language.enum';

export class ChangeUserLanguageBody {
  @IsEnum(Language)
  language: Language;
}
