import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ContractQueryDto {
  @IsOptional()
  @IsNumber()
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sortBy?: string = 'created_at';

  @IsOptional()
  @IsDate()
  dateFrom?: Date;

  @IsOptional()
  @IsDate()
  dateTo?: Date;

  @IsOptional()
  @IsNumber()
  fromMoney?: number;

  @IsOptional()
  @IsNumber()
  toMoney?: number;

  @IsOptional()
  @IsString()
  typeMoney?: string;

  @IsOptional()
  contractStatus?: number;

  @IsOptional()
  @IsBoolean()
  descending?: boolean = true;

  @IsOptional()
  @IsString()
  search?: string;
}
