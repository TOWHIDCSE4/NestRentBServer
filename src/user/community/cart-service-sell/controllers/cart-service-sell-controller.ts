// service.controller.ts
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { cartdto } from '../dtos/update-cart-service-sell';
import { CartServiceSellService } from '../services/cart-service-sell-service';

@ApiTags('Cart-Services')
@Controller('user/community/cart_service_sells')
export class CartServiceSellController {
  constructor(private readonly cartService: CartServiceSellService) {}

  @Get()
  async getAll() {
    const services = await this.cartService.getAll();

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Delete(':cart_id')
  async delete(@Param('cart_id') cartId: number) {
    const services = await this.cartService.deleteByid(cartId);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }

  @Put(':cart_id')
  async Update(
    @Param('cart_id') cart_id: number,
    @Body() cartservice: cartdto,
  ) {
    const services = await this.cartService.update(cart_id, cartservice);

    return {
      code: 200,
      success: true,
      msg_code: 'SUCCESS',
      msg: 'Success',
      data: services,
    };
  }
}
