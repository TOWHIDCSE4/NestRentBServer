import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateRenterDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  cmndNumber: string;

  @IsString()
  cmndFrontImageUrl: string;

  @IsString()
  cmndBackImageUrl: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsBoolean()
  hasContract?: boolean;

  @IsOptional()
  @IsString()
  motelName?: string;

  @IsString()
  nameTowerExpected: string;

  @IsOptional()
  @IsString()
  nameMotelExpected?: string;

  @IsOptional()
  @IsNumber()
  priceExpected?: number;

  @IsOptional()
  @IsNumber()
  depositExpected?: number;

  @IsOptional()
  @IsString()
  estimateRentalPeriod?: string;

  @IsOptional()
  @IsDate()
  estimateRentalDate?: Date;

  @IsNumber()
  towerId: number;

  @IsNumber()
  motelId: number;

  @IsString()
  imageUrl: string;

  @IsBoolean()
  isHidden: boolean;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsDate()
  dateRange?: Date;

  @IsOptional()
  @IsInt()
  sex?: number;

  @IsOptional()
  @IsString()
  job?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  typeFrom?: number;
}
