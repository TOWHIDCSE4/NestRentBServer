import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GlobalConfig } from '../common/config/global.config';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { UtilsModule } from '../utils/utils.module';
import { SessionUsersRepository } from './repositories/session-users.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthCommonService } from './services/common/auth.common.service';
import { AuthUserService } from './services/customer/auth.customer.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<GlobalConfig>) => ({
        secret: configService.get('auth.accessToken.secret'),
        signOptions: {
          algorithm: configService.get('auth.accessToken.algorithm'),
        },
      }),
    }),
    TypeOrmCustomModule.forFeature([UserRepository, SessionUsersRepository]),
    UtilsModule,
  ],
  controllers: [],
  providers: [AuthUserService, AuthCommonService],
  exports: [AuthUserService],
})
export class AuthModule {}
