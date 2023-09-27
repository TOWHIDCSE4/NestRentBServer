import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';

import { GlobalConfig } from '../../../common/config/global.config';

import { JwtAuthPayload } from '../../interfaces/jwt-payload.interface';

@Injectable()
export class AuthCommonService {
  constructor(private configService: ConfigService<GlobalConfig>) {}

  generateAccessToken(payload: JwtAuthPayload) {
    // return this.jwtService.sign(payload, {
    //   expiresIn: this.configService.get('auth.accessToken.expiresTime'),
    //   secret: this.configService.get('auth.accessToken.secret'),
    // });
  }

  generateRefreshToken(payload: JwtAuthPayload) {
    // return this.jwtService.sign(payload, {
    //   expiresIn: this.configService.get('auth.refreshToken.expiresTime'),
    //   secret: this.configService.get('auth.refreshToken.secret'),
    // });
  }
}
