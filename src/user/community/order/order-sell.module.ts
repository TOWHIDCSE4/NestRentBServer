import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order-sell.controller';
import { OrderServiceSell } from './order-sell.entity';
import { OrderService } from './order-sell.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderServiceSell])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderSellModule {}
