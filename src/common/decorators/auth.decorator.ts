import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { AdminGuards } from '../../auth/guards/admin.guards';
import { CheckPhoneNumberGuards } from '../../auth/guards/check-phone-number.gaurds';
import { UserGuards } from '../../auth/guards/user.guards';

export const IS_PUBLIC_KEY = Symbol();
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthenticateUser = () =>
  applyDecorators(UseGuards(UserGuards), TokenHeader());

export const AuthenticateAdmin = () =>
  applyDecorators(UseGuards(AdminGuards), TokenHeader());

export const AuthenticateUserRequirePhone = () =>
  applyDecorators(UseGuards(CheckPhoneNumberGuards), TokenHeader());

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

function TokenHeader() {
  return applyDecorators(ApiHeader({ name: 'token' }));
}
