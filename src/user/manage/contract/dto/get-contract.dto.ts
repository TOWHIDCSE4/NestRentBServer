import { ApiProperty } from '@nestjs/swagger';

export class GetContractRequest {
  @ApiProperty({ required: true })
  isAdmin: boolean;
  @ApiProperty({ required: true })
  userId: number;
}
