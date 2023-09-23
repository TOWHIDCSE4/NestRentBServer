import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { StatusCode } from '../../common/constants/status-code.constant';
import {
  BadRequestExc,
  UnauthorizedExc,
} from '../../common/exceptions/custom.exception';
import { AuthUserService } from '../services/customer/auth.customer.service';

@Injectable()
export class CheckPhoneNumberGuards implements CanActivate {
  constructor(private readonly authUserService: AuthUserService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const token: string = request.headers['token'];
      const user = await this.authUserService.authorizeUser(token);
      if (user?.id) {
        request.user = { ...user };
        request.token = request.headers['token'];
      }
      if (!user?.phone_number) {
        throw new BadRequestExc(StatusCode.PLEASE_UPDATE_YOUR_NUMBER_PHONE);
      }
      return !!user.id;
    } catch (error) {
      Logger.error('Auth user error', error);
      if (error instanceof BadRequestExc) throw error;
      throw new UnauthorizedExc(StatusCode.INVALID_TOKEN);
    }
  }
}
