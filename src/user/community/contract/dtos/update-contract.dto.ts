import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateContractDto {
  @IsBoolean()
  @IsOptional()
  isConfirmed: boolean;

  @IsArray()
  @IsOptional()
  imagesDeposit: string[]; // Assuming images are base64 encoded strings

  @IsNumber()
  @IsOptional()
  depositAmountPaid: number;

  @IsString()
  userPhoneNumber: string;
}
