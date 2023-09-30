// order.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderQueryDto } from './dto/order-service-sell.dto';
import { OrderServiceSell } from './order-sell.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderServiceSell)
    private readonly orderRepository: Repository<OrderServiceSell>,
  ) {}

  async getAllOrders(query: OrderQueryDto, userId: number) {
    const {
      limit = 20,
      search,
      sort_by = 'created_at',
      money_from,
      money_to,
      descending = true,
      order_status,
      payment_status,
      province,
      district,
      wards,
    } = query;

    const orderQuery = this.orderRepository
      .createQueryBuilder('order')
      .where('order.user_id = :userId', { userId })
      .andWhere('order.order_status = :orderStatus', {
        orderStatus: order_status,
      })
      .andWhere('order.payment_status = :paymentStatus', {
        paymentStatus: payment_status,
      })
      .andWhere('order.province = :province', { province })
      .andWhere('order.district = :district', { district })
      .andWhere('order.wards = :wards', { wards })
      .andWhere('order.total_final >= :moneyFrom', { moneyFrom: money_from })
      .andWhere('order.total_final <= :moneyTo', { moneyTo: money_to })
      .orderBy(`order.${sort_by}`, descending ? 'DESC' : 'ASC')
      .take(limit);

    const all = await orderQuery.getMany();

    return all;
  }
}
