import {
  IsValidBoolean,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';
import { PaginationReqDto } from '../../../common/dtos/pagination.dto';

export class GetListServiceSellReqDto extends PaginationReqDto {
  @IsValidText({ required: false })
  sort_by?: string;

  @IsValidBoolean({ required: false })
  descending?: boolean;

  @IsValidBoolean({ required: false })
  category_service_sell_ids?: number;
}
