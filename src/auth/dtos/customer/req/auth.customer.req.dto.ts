import { IsEmail } from 'class-validator';
import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';

export class CustomerLoginReqDto {
  @IsEmail({}, { message: 'auth.customer.invalidEmail' })
  email: string;

  @IsValidText({
    minLength: 6,
  })
  password: string;
}

export class RegisterCustomerReqDto {
  @IsEmail()
  email: string;

  @IsValidText({ minLength: 6 })
  password: string;
}
