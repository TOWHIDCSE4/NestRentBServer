import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({ description: 'Tên', required: true })
  @IsNotEmpty({ message: 'Tên là trường bắt buộc' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Số điện thoại', required: true })
  @IsNotEmpty({ message: 'Số điện thoại là trường bắt buộc' })
  @IsString()
  phone_number: string;

  @ApiProperty({ description: 'Email', required: true })
  @IsNotEmpty({ message: 'Email là trường bắt buộc' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({ description: 'Password', required: true })
  @IsNotEmpty({ message: 'Password là trường bắt buộc' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Confirm Password', required: true })
  @IsNotEmpty({ message: 'Confirm Password là trường bắt buộc' })
  @IsString()
  confirm_password: string;

  @ApiProperty({
    description: 'gửi tin nhắn (DV SAHA gửi tới 8085)',
    required: false,
  })
  @IsOptional()
  @IsString()
  otp: string;

  @ApiProperty({
    description: 'phone(từ sdt) email(từ email) mặc định là phone',
    required: false,
  })
  @IsOptional()
  @IsString()
  otp_from: string;
}
