import { Injectable } from '@nestjs/common';
import { StatusCode } from '../../../common/constants/status-code.constant';
import { UnauthorizedExc } from '../../../common/exceptions/custom.exception';
import { SessionUsersRepository } from '../../repositories/session-users.repository';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class AuthUserService {
  constructor(
    private userRepo: UserRepository,
    private sessionUsersRepo: SessionUsersRepository,
  ) {}

  async authorizeUser(token: string) {
    if (!token) {
      throw new UnauthorizedExc(StatusCode.INVALID_TOKEN);
    }
    const sessionUser = await this.sessionUsersRepo
      .createQueryBuilder('sessionUser')
      .where('sessionUser.token = :token', { token })
      .orderBy('sessionUser.created_at', 'DESC')
      .getOne();

    if (!sessionUser) {
      throw new UnauthorizedExc(StatusCode.NOT_HAVE_ACCESS_TOKEN);
    }

    const user = await this.userRepo.findOneBy({
      id: sessionUser.user_id,
    });
    if (!user) {
      await this.sessionUsersRepo.delete(sessionUser);
      throw new UnauthorizedExc(StatusCode.NOT_HAVE_ACCESS_TOKEN);
    }
    return user;
  }

  async authorizeAdmin(token: string) {
    if (!token) {
      throw new UnauthorizedExc(StatusCode.INVALID_TOKEN);
    }
    const sessionUser = await this.sessionUsersRepo
      .createQueryBuilder('sessionUser')
      .where('sessionUser.token = :token', { token })
      .orderBy('sessionUser.createdAt', 'DESC')
      .getOne();

    if (!sessionUser) {
      throw new UnauthorizedExc(StatusCode.NOT_HAVE_ACCESS_TOKEN);
    }

    const user = await this.userRepo.findOneBy({
      id: sessionUser.user_id,
    });
    if (!user) {
      await this.sessionUsersRepo.delete(sessionUser);
      throw new UnauthorizedExc(StatusCode.NOT_HAVE_ACCESS_TOKEN);
    }
    if (!user.is_admin) {
      throw new UnauthorizedExc(StatusCode.NOT_HAVE_ACCESS_TOKEN);
    }

    return user;
  }
}
