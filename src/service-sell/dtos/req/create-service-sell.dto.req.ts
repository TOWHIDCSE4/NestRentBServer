import {
  IsValidArrayString,
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class CreateAndUpdateServiceSellReqDto {
  @IsValidNumber({ required: false })
  service_sell_id?: number;

  @IsValidText({ required: false })
  name?: string;

  @IsValidText({ required: false })
  service_sell_icon?: string;

  @IsValidText({ required: false, maxLength: 500000 })
  description?: string;

  @IsValidText({ required: false })
  name_str_filter?: string;

  @IsValidArrayString({ required: false })
  images?: string[];

  @IsValidNumber()
  category_service_sell_id: number;

  @IsValidNumber()
  price?: number;

  @IsValidText({ required: false })
  seller_service_name?: string;

  @IsValidText({ required: false })
  phone_number_seller_service?: string;

  @IsValidNumber({ required: false })
  status?: number;
}
