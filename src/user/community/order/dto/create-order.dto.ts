export class CreateOrderDTO {
  readonly userId: number;
  readonly name: string;
  readonly email: string;
  readonly phone_number: string;
  readonly province: string;
  readonly district: string;
  readonly wards: string;
  readonly address_detail: string;
  readonly note: string;
}
