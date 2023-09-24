import { HttpStatus } from '@nestjs/common';

export class QueryResponseDto {
  constructor(
    code: HttpStatus,
    success: boolean,
    englishMsg: string,
    otherMsg: string,
    data: any = null,
  ) {
    this.code = code;
    this.success = success;
    this.msg_code = englishMsg;
    this.msg = otherMsg;
    this.data = data;
  }
  code: HttpStatus;
  success: boolean;
  msg_code: string;
  msg: string;
  data?: any;
}
