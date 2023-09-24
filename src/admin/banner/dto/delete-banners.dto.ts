import { IsArray } from 'class-validator';

export class DeleteBannerDto {
  @IsArray({ message: 'List of banner IDs must be an array' })
  list_id_banner: number[];
}
