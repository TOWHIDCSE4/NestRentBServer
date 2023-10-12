// getAllMotelTowerDto.ts

import { ApiProperty } from '@nestjs/swagger';

export class GetAllMotelTowerDto {
  @ApiProperty()
  tower_id: number;
}
