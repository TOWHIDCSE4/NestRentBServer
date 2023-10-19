import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReservationMotelUpdateDto {
  @IsNumber()
  @IsOptional()
  mo_post_id?: number;

  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsNumber()
  @IsOptional()
  host_id?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsNumber()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  wards?: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsOptional()
  province_name?: string;

  @IsString()
  @IsOptional()
  district_name?: string;

  @IsString()
  @IsOptional()
  wards_name?: string;

  @IsString()
  @IsOptional()
  address_detail?: string;
}
