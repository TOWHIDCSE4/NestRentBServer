import { ExecutionContext } from '@nestjs/common';
import { IAuthGuard } from '@nestjs/passport';
import { StatusCode } from '../../common/constants/status-code.constant';
import {
  CustomException,
  UnauthorizedExc,
} from '../../common/exceptions/custom.exception';

export const handleRequest: IAuthGuard['handleRequest'] = (
  err: any,
  user: any,
  info: any,
  context: ExecutionContext,
  status?: any,
) => {
  if (err instanceof CustomException) throw err;

  if (err || !user) {
    throw new UnauthorizedExc(StatusCode.INVALID_TOKEN);
  }
  return user;
};
