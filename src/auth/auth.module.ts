import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { ServiceRepository } from '../service/repositories/service.repository';
import { UtilsModule } from '../utils/utils.module';
import { AuthController } from './auth.controller';
import { OtpCodePhoneRepository } from './repositories/otp-code-phone.repository';
import { SessionUsersRepository } from './repositories/session-users.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthCommonService } from './services/common/auth.common.service';
import { AuthCustomerUserService } from './services/customer/auth.customer.service';
import { AuthUserService } from './services/user/auth-user.service';

@Module({
  imports: [
    // PassportModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService<GlobalConfig>) => ({
    //     secret: configService.get('auth.accessToken.secret'),
    //     signOptions: {
    //       algorithm: configService.get('auth.accessToken.algorithm'),
    //     },
    //   }),
    // }),
    TypeOrmCustomModule.forFeature([
      UserRepository,
      SessionUsersRepository,
      OtpCodePhoneRepository,
      ServiceRepository,
    ]),
    UtilsModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthCustomerUserService, AuthCommonService, AuthUserService],
  exports: [AuthCustomerUserService],
})
export class AuthModule {}
