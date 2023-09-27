import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Transactional } from 'typeorm-transactional';
import { User } from '../../../auth/entities/user.entity';
import { UserRepository } from '../../../auth/repositories/user.repository';
import { StatusCode } from '../../../common/constants/status-code.constant';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { EventEmitterName } from '../../../common/enums/app.enum';
import { BadRequestExc } from '../../../common/exceptions/custom.exception';
import { generateTransactionID } from '../../../common/utils';
import {
  NotiUserDefineCode,
  TypeFCM,
} from '../../../notification/enums/noti.enum';
import { NotificationService } from '../../../notification/services/notification.service';
import { WithdrawalsReqDto } from '../../dtos/req/withdrawals.req.dto';
import { WalletTransactionsType } from '../../enums/wallet-transaction.enum';
import { WalletTransactionsRepository } from '../../repositories/wallet-transactions.repository';
import { WithdrawalsRepository } from '../../repositories/withdrawals.repository';

@Injectable()
export class WithdrawalsAdminService {
  constructor(
    private userRepo: UserRepository,
    private withdrawalsRepo: WithdrawalsRepository,
    private walletTransactionsRepo: WalletTransactionsRepository,
    private notificationService: NotificationService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Transactional()
  async createWalletWithdrawals(body: WithdrawalsReqDto, user: User) {
    const {
      withdraw_money,
      account_number,
      bank_account_holder_name,
      bank_name,
      withdraw_content,
    } = body;
    const userExits = await this.userRepo.findOneBy({
      id: user.id,
    });
    if (!withdraw_money)
      throw new BadRequestExc(StatusCode.WITHDRAW_MONEY_IS_REQUIRED);

    if (withdraw_money > user.golden_coin)
      throw new BadRequestExc(
        StatusCode.WITHDRAWAL_MONEY_CANNOT_GREATER_THAN_BALANCE,
      );

    const walletTransactionCreated = await this.walletTransactionsRepo.save({
      user_id: user.id,
      account_number,
      bank_account_holder_name,
      bank_name,
      withdraw_money,
      withdraw_trading_code: generateTransactionID(),
      withdraw_date_time: new Date(),
      withdraw_content,
      type: WalletTransactionsType.WITHDRAW,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const remainingGoldenCoin = user.golden_coin - withdraw_money;
    await this.userRepo.save({
      ...user,
      golden_coin: remainingGoldenCoin,
      updated_at: new Date(),
    });

    // await this.notificationService.handle({
    //   user_id: null,
    //   title: 'Yêu cầu rút tiền mới',
    //   content: `Yêu cầu rút tiền mới từ người dùng ${user.name}`,
    //   type: TypeFCM.NEW_REQUEST_WITHDRAWAL,
    //   role: NotiUserDefineCode.USER_IS_ADMIN,
    //   references_value: walletTransactionCreated.id.toString(),
    // });

    this.eventEmitter.emit(EventEmitterName.NOTIFICATION, {
      user_id: null,
      title: 'Yêu cầu rút tiền mới',
      content: `Yêu cầu rút tiền mới từ người dùng ${user.name}`,
      type: TypeFCM.NEW_REQUEST_WITHDRAWAL,
      role: NotiUserDefineCode.USER_IS_ADMIN,
      references_value: walletTransactionCreated.id.toString(),
    });

    return AppResponseDto.fromNonePagination(walletTransactionCreated);
  }
}
