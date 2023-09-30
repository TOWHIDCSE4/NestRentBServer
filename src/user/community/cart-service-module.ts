import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../auth/entities/user.entity';
import { ServiceSells } from '../../service-sell/entities/service-sell.entity';
import { CartServiceSellController } from './controllers/cart-service-sell-controller';
import { ItemCartServiceSell } from './entity/item-service-sell-entity';
import { CartServiceSellService } from './services/cart-service-sell-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemCartServiceSell, User, ServiceSells]),
  ],
  controllers: [CartServiceSellController],
  providers: [CartServiceSellService],
})
export class CartServiceModule {}
