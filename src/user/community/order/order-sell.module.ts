import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderServiceSell } from './order-sell.entity';
import { OrderController } from './order-sell.controller';
import { OrderService } from './order-sell.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderServiceSell])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [],
})
export class OrderSellModule {}
