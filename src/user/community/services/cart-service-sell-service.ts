// service.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceSells } from '../../../service-sell/entities/service-sell.entity';
import { cartdto } from '../dtos/update-cart-service-sell';
import { userDto } from '../dtos/user-dto';
import { ItemCartServiceSell } from '../entity/item-service-sell-entity';

@Injectable()
export class CartServiceSellService {
  constructor(
    @InjectRepository(ItemCartServiceSell)
    private cartServiceRepository: Repository<ItemCartServiceSell>,
    @InjectRepository(ServiceSells)
    private serviceSellRepo: Repository<ServiceSells>,
  ) {}

  // Add other service methods as needed

  async getAllByUserId(user: userDto): Promise<ItemCartServiceSell[]> {
    let totalFinal = 0;
    let totalBeforeDiscount = 0;
    const cartItems = await this.cartServiceRepository.find({
      where: { user_id: user.user_id },
    }); // Assuming you have an ItemCartServiceSell entity and using TypeORM

    const lineItemsInTime = [];

    for (const cartItem of cartItems) {
      totalBeforeDiscount += cartItem.serviceSell.price * cartItem.quantity;
      totalFinal += cartItem.serviceSell.price * cartItem.quantity;

      lineItemsInTime.push({
        id: cartItem.serviceSell.id,
        quantity: cartItem.quantity,
        name: cartItem.serviceSell.name,
        image_url:
          cartItem.serviceSell.images != null &&
          cartItem.serviceSell.images.length > 0
            ? cartItem.serviceSell.images[0]
            : null,
        item_price: cartItem.serviceSell.price,
      });
    }

    return lineItemsInTime;

    //return this.serviceRepository.find({ where: { user_id: userId } });
  }

  async deleteByid(cartId: number): Promise<ItemCartServiceSell> {
    try {
      const service = await this.cartServiceRepository.findOneById(cartId);
      if (service === null)
        throw new NotFoundException(`Mo Service with ID ${cartId} not found`);
      await this.cartServiceRepository.remove(service);
      return service;
    } catch (error) {
      throw new NotFoundException(`Error in getting the service`);
    }
  }

  async update(
    id: number,
    updateCartService: cartdto,
  ): Promise<ItemCartServiceSell> {
    const cartServiceSellExists = await this.cartServiceRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!cartServiceSellExists) {
      throw new NotFoundException(`cart service sell with ID ${id} not found`);
    }

    const serviceSell = await this.serviceSellRepo.findOne({
      where: { id: cartServiceSellExists.serviceSell.id },
    });

    if (!serviceSell) {
      throw new NotFoundException(
        ` service sell with ID ${cartServiceSellExists.serviceSell.id} not found`,
      );
    }

    if (updateCartService.quantity == 0) {
      await this.cartServiceRepository.delete(id);
    } else {
      cartServiceSellExists.quantity = updateCartService.quantity;
      cartServiceSellExists.item_price = updateCartService.price;

      await this.cartServiceRepository.update(id, cartServiceSellExists);
    }

    return cartServiceSellExists;
  }
}
