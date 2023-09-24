import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateBannerDto {
  @IsUrl({ message: 'Image URL must be a valid URL' })
  @IsOptional()
  image_url?: string;

  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Action link must be a string' })
  @IsOptional()
  action_link?: string;
}
