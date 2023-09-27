import { Controller, Get, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UserHeadersDto } from './auth/dtos/common/req/user-header.dto';
import { User } from './auth/entities/user.entity';
import {
  AuthenticateUserRequirePhone,
  CurrentUser,
} from './common/decorators/auth.decorator';

@ApiTags('test')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @AuthenticateUserRequirePhone()
  getHello(@Headers() { token }: UserHeadersDto, @CurrentUser() user: User) {
    return user;
  }
}
