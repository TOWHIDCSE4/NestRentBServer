// create-tower-motel.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateTowerMotelDto {
  @ApiProperty()
  towerId: number;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  @IsArray()
  listMotelId: number[];
}
