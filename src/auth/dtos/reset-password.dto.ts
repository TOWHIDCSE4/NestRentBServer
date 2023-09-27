import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty()
  otp: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email_or_phone_number: string;
}
