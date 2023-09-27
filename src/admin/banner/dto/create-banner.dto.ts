import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBannerDto {
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  image_url: string;

  @IsString({ message: 'Title must be a string' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'Action link must be a string' })
  @IsOptional()
  action_link?: string;
}
