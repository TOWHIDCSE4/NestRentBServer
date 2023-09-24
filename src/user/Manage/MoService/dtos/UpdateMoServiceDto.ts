import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateMoServiceDto {
  @IsString()
  @IsNotEmpty()
  service_name: string;

  @IsOptional()
  @IsString()
  service_icon: string;

  @IsOptional()
  @IsNumber()
  motel_id: number;

  @IsOptional()
  @IsString()
  service_unit: string;

  @IsOptional()
  @IsNumber()
  service_charge: number;

  @IsArray()
  @IsOptional()
  images: string;

  @IsNumber()
  @IsNotEmpty()
  type_unit: number;

  @IsOptional()
  @IsString()
  note: string;

  @IsUrl({ message: 'Image URL must be a valid URL' })
  @IsOptional()
  image_url?: string;
}
