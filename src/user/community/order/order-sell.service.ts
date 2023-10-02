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
      .where('order.user_id = :userId', { userId });

    if (order_status) {
      orderQuery.andWhere('order.order_status = :orderStatus', {
        orderStatus: order_status,
      });
    }

    if (payment_status) {
      orderQuery.andWhere('order.payment_status = :paymentStatus', {
        paymentStatus: payment_status,
      });
    }

    if (province) {
      orderQuery.andWhere('order.province = :province', { province });
    }

    if (district) {
      orderQuery.andWhere('order.district = :district', { district });
    }

    if (wards) {
      orderQuery.andWhere('order.wards = :wards', { wards });
    }

    if (money_from) {
      orderQuery.andWhere('order.total_final >= :moneyFrom', {
        moneyFrom: money_from,
      });
    }

    if (money_to) {
      orderQuery.andWhere('order.total_final <= :moneyTo', {
        moneyTo: money_to,
      });
    }

    orderQuery
      .orderBy(`order.${sort_by}`, descending ? 'DESC' : 'ASC')
      .take(limit);

    const all = await orderQuery.getMany();

    return all;
  }
}
