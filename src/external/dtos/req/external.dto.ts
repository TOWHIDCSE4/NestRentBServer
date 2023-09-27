import { IsValidText } from '../../../common/decorators/custom-validator.decorator';

export class UploadFilReqDto {
  @IsValidText({ required: false })
  type?: string;
}
