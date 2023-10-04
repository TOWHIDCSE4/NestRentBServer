import { ApiProperty } from '@nestjs/swagger';

enum ContractStatus {
  PROGRESSING = 'progressing',
  WAITING_CONFIRM = 'waiting_confirm',
  TERMINATION = 'termination',
}

export class GetAllContractsRequest {
  @ApiProperty({ required: true })
  isAdmin: boolean;
  @ApiProperty({ required: true })
  userId: number;
  @ApiProperty({ required: false })
  contract_status: ContractStatus;
  @ApiProperty({ required: false })
  money_from: number;
  @ApiProperty({ required: false })
  money_to: number;
  @ApiProperty({ required: false })
  type_money: string;
  @ApiProperty({ required: false })
  search: string;
  @ApiProperty({ required: false })
  limit: number;
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  date_from: string;
  @ApiProperty({ required: false })
  date_to: string;
  @ApiProperty({ required: false })
  sort_by: string;
  @ApiProperty({ required: false })
  descending: boolean;
}
