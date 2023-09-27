import { Controller, Post } from '@nestjs/common';
import { PrefixType } from '../../../common/constants/global.constant';

@Controller(`${PrefixType.USER}/withdraws`)
export class WithdrawalsAdminController {
  constructor() {}

  @Post()
  createWalletWithdraws() {}
}
