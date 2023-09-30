// order.controller.ts

import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderQueryDto } from './dto/order-service-sell.dto';
import { OrderService } from './order-sell.service';

@ApiTags('Order Service Sell')
@Controller('user/community/order_service_sells')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(
    @Query() query: OrderQueryDto,
    @Request() request,
  ): Promise<any> {
    const userId = parseInt(query.user_id); // Assuming you have user data in the request

    const allOrders = await this.orderService.getAllOrders(query, userId);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: allOrders,
    };
  }
}
