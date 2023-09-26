import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { StatusCode } from '../../common/constants/status-code.constant';
import { UnauthorizedExc } from '../../common/exceptions/custom.exception';
import { AuthCustomerUserService } from '../services/customer/auth.customer.service';

@Injectable()
export class AdminGuards implements CanActivate {
  constructor(private readonly authUserService: AuthCustomerUserService) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const token: string = request.headers['token'];
      const user = await this.authUserService.authorizeAdmin(token);
      if (user?.id) {
        request.user = { ...user };
        request.token = request.headers['token'];
      }
      return !!user.id;
    } catch (error) {
      Logger.error('Auth admin error', error);
      throw new UnauthorizedExc(StatusCode.INVALID_TOKEN);
    }
  }
}
