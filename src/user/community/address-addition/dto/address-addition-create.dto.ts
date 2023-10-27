import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressAdditionDto {
  @IsString()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty({ message: 'INVALID_PROVINCE' })
  province: number;

  @IsString()
  @IsNotEmpty({ message: 'INVALID_DISTRICT' })
  district: number;

  @IsString()
  @IsNotEmpty({ message: 'INVALID_WARDS' })
  wards: number;

  @IsString()
  @IsOptional()
  address_detail: string;

  @IsString()
  @IsOptional()
  note: string;
}
