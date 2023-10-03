import { AddressAdditionDTO } from './address-addition.dto';
import { CreateOrderDTO } from './create-order.dto';

export class OrderSellSendDto {
  readonly createOrder: CreateOrderDTO;
  readonly address: AddressAdditionDTO;
}
