// commission.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CommissionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  date_from: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  date_to: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  limit = 20;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  sort_by: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  descending: boolean;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  status: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search: string;
}
