import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  service_name: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsString()
  service_icon?: string;

  @IsNotEmpty()
  @IsString()
  service_unit: string;

  @IsNotEmpty()
  @IsNumber()
  service_charge: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  @IsNumber()
  is_default: number;

  @IsNotEmpty()
  @IsNumber()
  type_unit: number;
}
