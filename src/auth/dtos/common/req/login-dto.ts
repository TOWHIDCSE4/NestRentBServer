import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  otp?: string;

  @ApiProperty()
  is_otp?: boolean;

  @ApiProperty()
  password?: string;
}
