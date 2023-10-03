// order.service.ts

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AddressAddition } from '../entity/address-addition.entity';
import { ItemCartServiceSell } from '../entity/item-service-sell-entity';
import { LineItemServiceSell } from '../entity/line_item_service_sell.entity';
import { AddressAdditionDTO } from './dto/address-addition.dto';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderQueryDto } from './dto/order-service-sell.dto';
import { OrderServiceSell } from './order-sell.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderServiceSell)
    private readonly orderRepository: Repository<OrderServiceSell>,
    @InjectRepository(ItemCartServiceSell)
    private readonly itemCartServiceSellRepository: Repository<ItemCartServiceSell>,
    @InjectRepository(LineItemServiceSell)
    private readonly lineItemRepository: Repository<LineItemServiceSell>,
    @InjectRepository(AddressAddition)
    private readonly addressRepository: Repository<AddressAddition>,
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

  async sendCart(
    userId: number,
    createOrderDTO: CreateOrderDTO,
    addressDTO: AddressAdditionDTO,
  ) {
    const cartItems = await this.getItemCartServiceSell(userId);
    if (cartItems.cart_items.length === 0) {
      return {
        code: HttpStatus.OK,
        success: false,
        msg_code: 'NO_LINE_ITEMS',
        msg: 'Không có sản phẩm này trong đơn',
      };
    }

    // Step 2: Validate name
    if (!createOrderDTO.name) {
      return {
        code: HttpStatus.OK,
        success: false,
        msg_code: 'NAME_IS_REQUIRED',
        msg: 'Tên không được trống',
      };
    }

    // Step 3: Validate phone number
    if (!createOrderDTO.phone_number) {
      return {
        code: HttpStatus.OK,
        success: false,
        msg_code: 'INVALID_PHONE_NUMBER',
        msg: 'Số điện thoại không hợp lệ',
      };
    }

    const order = await this.orderRepository.create({
      user_id: userId,
      order_code: randomUUID().substr(0, 8),
      order_status: '0',
      payment_status: '1',
      total_shipping_fee: 0,
      total_final: cartItems.total_final,
      total_before_discount: cartItems.total_before_discount,
      name: createOrderDTO.name,
      email: createOrderDTO.email,
      phone_number: createOrderDTO.phone_number,
      province: addressDTO.province,
      district: addressDTO.district,
      wards: addressDTO.wards,
    });

    await this.createLineItems(order, cartItems.cart_items);

    // Step 6: Save or update AddressAddition
    await this.saveOrUpdateAddressAddition(addressDTO, userId);

    return {
      success: true,
      msg_code: 'SUCCESS',
      msg: 'THÀNH CÔNG',
      data: order,
    };
  }

  private async createLineItems(
    order: OrderServiceSell,
    cartItems: ItemCartServiceSell[],
  ) {
    const lineItems: LineItemServiceSell[] = [];

    for (const cartItem of cartItems) {
      const lineItem = new LineItemServiceSell();
      lineItem.orderServiceSell_id = order.id;
      lineItem.service_sell_id = cartItem.serviceSell.id; // Assuming you have a serviceSell relationship in LineItem entity
      lineItem.quantity = cartItem.quantity;
      lineItem.user_id = +cartItem.user_id;
      // Calculate total_price and other properties if needed
      await this.lineItemRepository.save({
        order: order,
        serviceSell: cartItem.serviceSell,
        quantity: cartItem.quantity,
        user_id: cartItem.user_id,
      });
    }
  }

  private async saveOrUpdateAddressAddition(
    addressDTO: AddressAdditionDTO,
    userId: number, // Assuming you have the user_id
  ) {
    const addressAddition = await this.addressRepository.findOne({
      where: { userId: userId },
    });

    if (addressAddition) {
      await this.addressRepository.update(addressAddition.id, {
        province: addressDTO.province,
        district: addressDTO.district,
        wards: addressDTO.district,
        addressDetail: addressDTO.address_detail,
        note: addressDTO.note,
      });
    } else {
      await this.addressRepository.save({
        province: addressDTO.province,
        district: addressDTO.district,
        wards: addressDTO.wards,
        addressDetail: addressDTO.address_detail,
        note: addressDTO.note,
        user_id: userId,
      });
    }
  }

  private async getItemCartServiceSell(userId: number) {
    let total_final = 0;
    let total_before_discount = 0;
    const line_items_in_time = [];

    const cart_items = await this.itemCartServiceSellRepository.find({
      where: {
        user_id: userId,
      },
    });

    for (const cart_item of cart_items) {
      total_before_discount += cart_item.serviceSell.price * cart_item.quantity;
      total_final += cart_item.serviceSell.price * cart_item.quantity;

      line_items_in_time.push({
        id: cart_item.serviceSell.id,
        quantity: cart_item.quantity,
        name: cart_item.serviceSell.name,
        image_url:
          cart_item.serviceSell.images?.length > 0
            ? cart_item.serviceSell.images[0]
            : null,
        item_price: cart_item.serviceSell.price,
      });
    }

    const response: any = {
      total_before_discount: total_before_discount,
      total_final: total_final,
      cart_items: cart_items,
      total_shipping_fee: 0,
    };

    return response;
  }
}
