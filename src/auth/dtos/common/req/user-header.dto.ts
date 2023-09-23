import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';

export class UserHeadersDto {
  @IsValidText({ required: true })
  token: string;
}
