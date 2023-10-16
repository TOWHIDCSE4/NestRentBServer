import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class LocationPostDto {
  @ApiProperty()
  @IsOptional()
  limit: number;

  @ApiProperty()
  @IsOptional()
  sublocality?: string;

  @ApiProperty()
  @IsOptional()
  subadministrative_area?: string;

  @ApiProperty()
  @IsOptional()
  administrative_area?: string;
}
