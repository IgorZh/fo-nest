import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  HttpService,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChangeUserLanguageBody } from './dto/change-user-language-body.dto';
import { GetUserByIdParams } from './dto/get-user-by-id-params.dto';
import { UsersService } from './users.service';
import { map } from 'rxjs/operators';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private userService: UsersService,
    private httpService: HttpService,
  ) {}

  @Get()
  getProfile(@Req() req) {
    return this.userService.findById(req.user.userId);
  }

  @Get(':id')
  getUserById(@Param() param: GetUserByIdParams) {
    return this.userService.findById(param.id);
  }

  @Post()
  changeLanguage(@Body() body: ChangeUserLanguageBody, @Req() req) {
    return this.userService.changeLanguage(req.user.userId, body.language);
  }

  @Get('/proxy')
  findAll(@Req() request: Request) {
    return this.httpService
      .get('http://localhost:9096/api/v1/promotion-tags', {
        headers: request.headers,
        params: request.query,
      })
      .pipe(map(response => response.data));
  }
}
