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
import { MoService } from './mo-service/entities/mo-service';
import { MoServiceModule } from './mo-service/mo-service.module';
import { CategoryServiceSells } from './service-sell/entities/category-service-sells.entity';
import { ServiceSells } from './service-sell/entities/service-sell.entity';
import { ViewerServiceSell } from './service-sell/entities/viewer-service-sell.entity';
import { Service } from './service/entities/service.entity';
import { ServiceModule } from './service/service.module';
import { CartServiceModule } from './user/community/cart-service-module';
import { ItemCartServiceSell } from './user/community/entity/item-service-sell-entity';
import { LineItemServiceSell } from './user/community/entity/line_item_service_sell.entity';
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
        ItemCartServiceSell,
        ServiceSells,
        LineItemServiceSell,
        CategoryServiceSells,
        ViewerServiceSell,
      ],
      synchronize: true,
    }),
    AuthModule,
    UtilsModule,
    ServiceModule,
    AdminBannerModule,
    MoServiceModule,
    CartServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
