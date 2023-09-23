import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AdminGuards } from '../../auth/guards/admin.guards';
import { CheckPhoneNumberGuards } from '../../auth/guards/check-phone-number.gaurds';
import { UserGuards } from '../../auth/guards/user.guards';

export const IS_PUBLIC_KEY = Symbol();
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthenticateUser = () => applyDecorators(UseGuards(UserGuards));

export const AuthenticateAdmin = () => applyDecorators(UseGuards(AdminGuards));

export const AuthenticateUserRequirePhone = () =>
  applyDecorators(UseGuards(CheckPhoneNumberGuards));

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
