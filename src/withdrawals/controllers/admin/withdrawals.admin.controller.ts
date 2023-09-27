import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../../../auth/entities/user.entity';
import { PrefixType } from '../../../common/constants/global.constant';
import {
  AuthenticateUser,
  CurrentUser,
} from '../../../common/decorators/auth.decorator';
import { WithdrawalsReqDto } from '../../dtos/req/withdrawals.req.dto';
import { WithdrawalsAdminService } from '../../services/admin/withdrawals.admin.service';

@Controller(`${PrefixType.ADMIN}/withdraws`)
@AuthenticateUser()
export class WithdrawalsAdminController {
  constructor(private withdrawalsAdminService: WithdrawalsAdminService) {}

  @Post()
  createWalletWithdrawals(
    @Body() body: WithdrawalsReqDto,
    @CurrentUser() user: User,
  ) {
    return this.withdrawalsAdminService.createWalletWithdrawals(body, user);
  }
}
