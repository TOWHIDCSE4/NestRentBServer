import { ApiProperty } from '@nestjs/swagger';

export class GetContractRequest {
  @ApiProperty({ required: true, type: 'boolean' })
  isAdmin: boolean;
  @ApiProperty({ required: true })
  userId: number;
}
