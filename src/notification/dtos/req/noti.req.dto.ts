import {
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';

export class NotificationReqDto {
  @IsValidNumber()
  user_id: number;

  @IsValidText()
  title: string;

  @IsValidText()
  content: string;

  @IsValidText()
  type: string;

  @IsValidNumber()
  role: number;

  @IsValidText()
  references_value: string;
}
