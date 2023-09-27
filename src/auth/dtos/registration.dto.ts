import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ example: '4197142959' })
  phone_number: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirm_password: string;

  @ApiProperty()
  otp: string;

  @ApiProperty()
  otp_from: string;

  @ApiProperty({ example: null })
  referral_code: string;
}
