export class ContractQueryDto {
  limit?: number = 20;

  sortBy?: string = 'created_at';

  dateFrom?: Date;

  dateTo?: Date;

  fromMoney?: number;

  toMoney?: number;

  typeMoney?: string;

  contractStatus?: number;

  descending?: boolean = true;

  search?: string;
}
