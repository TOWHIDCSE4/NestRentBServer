// order-query.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrderQueryDto {
  limit?: number;
  search?: string;
  sort_by?: string;
  money_from?: number;
  money_to?: number;
  descending?: boolean;
  order_status?: string;
  payment_status?: string;
  province?: string;
  district?: string;
  wards?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  user_id: string;
}
