import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalConfig } from '../common/config/global.config';
import { UtilsModule } from '../utils/utils.module';
import { AuthController } from './auth.controller';
import { OtpCodePhone } from './entities/otp-code-phone';
import { SessionUsers } from './entities/session-users.entity';
import { User } from './entities/user.entity';
import { AuthCommonService } from './services/common/auth.common.service';
import { AuthCustomerUserService } from './services/customer/auth.customer.service';
import { AuthUserService } from './services/user/auth-user.service';

@Module({
  imports: [
    PassportModule,
    UtilsModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => ({
        secret: configService.get('auth.accessToken.secret'),
        signOptions: {
          algorithm: configService.get('auth.accessToken.algorithm'),
        },
      }),
    }),
    TypeOrmModule.forFeature([User, OtpCodePhone, SessionUsers]),
  ],
  controllers: [AuthController],
  providers: [AuthCustomerUserService, AuthCommonService, AuthUserService],
  exports: [AuthCustomerUserService],
})
export class AuthModule {}
