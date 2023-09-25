import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Phone number must be a string' })
  phone_number: string;

  @IsOptional()
  @IsString({ message: 'OTP must be a string' })
  otp?: string;

  @IsOptional()
  @IsBoolean({ message: 'is_otp must be a boolean' })
  is_otp?: boolean;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  password?: string;
}
