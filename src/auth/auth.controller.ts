import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/common/req/login-dto';
import { AuthUserService } from './services/user/auth-user.service';

@ApiTags('Auth User')
@Controller('user')
export class AuthController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authUserService.login(loginDto);
  }
}
