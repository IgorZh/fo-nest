import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserByIdParams {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
