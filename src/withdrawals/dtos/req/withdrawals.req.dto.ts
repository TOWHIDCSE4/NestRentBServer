import {
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class WithdrawalsReqDto {
  @IsValidNumber({ required: false })
  withdraw_money?: number;

  @IsValidNumber({ required: false })
  account_number?: string;

  @IsValidText({ required: false })
  bank_account_holder_name?: string;

  @IsValidText({ required: false })
  bank_name?: string;

  @IsValidText({ required: false })
  withdraw_content?: string;
}
