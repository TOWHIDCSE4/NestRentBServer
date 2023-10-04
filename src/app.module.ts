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
import { ContractModule } from './user/community/contract/contract.module';
import { Contract } from './user/community/contract/entities/contract.entity';
import { Motel } from './user/community/contract/entities/motel.entity';
import { UserContract } from './user/community/contract/entities/user-contracts.entity';
import { AddressAddition } from './user/community/entity/address-addition.entity';
import { ItemCartServiceSell } from './user/community/entity/item-service-sell-entity';
import { LineItemServiceSell } from './user/community/entity/line_item_service_sell.entity';
import { OrderServiceSell } from './user/community/order/order-sell.entity';
import { OrderSellModule } from './user/community/order/order-sell.module';
import { ManageContractModule } from './user/manage/contract/manage-contract.module';
import { Renter } from './user/manage/entities/renter.entity';
import { renterModule } from './user/manage/renter.module';
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
        Motel,
        Contract,
        UserContract,
        OrderServiceSell,
        AddressAddition,
        Renter,
      ],
      synchronize: false,
    }),
    AuthModule,
    UtilsModule,
    ServiceModule,
    AdminBannerModule,
    MoServiceModule,
    CartServiceModule,
    ContractModule,
    OrderSellModule,
    renterModule,
    ManageContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
