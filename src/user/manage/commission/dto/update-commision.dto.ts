// commission.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateCommissionDto {
  @IsOptional()
  @ApiProperty({ required: false })
  images_host_paid: string[];

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  status: number;
}
