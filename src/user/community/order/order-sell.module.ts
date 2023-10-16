import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressAddition } from '../cart-service-sell/entity/address-addition.entity';
import { ItemCartServiceSell } from '../cart-service-sell/entity/item-service-sell-entity';
import { LineItemServiceSell } from '../cart-service-sell/entity/line_item_service_sell.entity';
import { OrderController } from './order-sell.controller';
import { OrderServiceSell } from './order-sell.entity';
import { OrderService } from './order-sell.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderServiceSell,
      ItemCartServiceSell,
      AddressAddition,
      LineItemServiceSell,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderSellModule {}
