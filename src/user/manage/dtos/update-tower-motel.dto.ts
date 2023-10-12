// updateTowerMotelDto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTowerMotelDto {
  @ApiProperty()
  @IsOptional()
  status: number;

  @ApiProperty()
  tower_id: number;
}
