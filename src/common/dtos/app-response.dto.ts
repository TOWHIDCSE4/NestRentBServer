export class AppMetaDto {
  status: number;
  message?: string;
  error?: string;
  subInfo?: any;
}

export class AppResponseDto {
  code: number;
  success?: boolean;
  msg_code?: string;
  msg?: string;
  data?: any;

  constructor(data?: any) {
    this.data = typeof data === 'undefined' ? null : data;
    this.code = 200;
    this.success = true;
    this.msg_code = 'SUCCESS';
    this.msg = 'THÀNH CÔNG';
  }
}
