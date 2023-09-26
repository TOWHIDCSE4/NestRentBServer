import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminBannerModule } from './admin/banner/admin-banner.module';
import { DBAdminBanner } from './admin/banner/entity/admin-banner.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OtpCodePhone } from './auth/entities/otp-code-phone';
import { SessionUsers } from './auth/entities/session-users.entity';
import { User } from './auth/entities/user.entity';
import { CategoryServiceSells } from './service-sell/entities/category-service-sells.entity';
import { ServiceSells } from './service-sell/entities/service-sell.entity';
import { Service } from './user/Manage/entities/service.entity';
import { MoService } from './user/Manage/MoService/entity/mo-service';
import { MoServiceModule } from './user/Manage/MoService/mo-service.module';
import { ServiceModule } from './user/Manage/service.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Service,
        DBAdminBanner,
        MoService,
        OtpCodePhone,
        SessionUsers,
        CategoryServiceSells,
        ServiceSells,
      ],
      synchronize: true,
    }),
    AuthModule,
    UtilsModule,
    ServiceModule,
    AdminBannerModule,
    MoServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
