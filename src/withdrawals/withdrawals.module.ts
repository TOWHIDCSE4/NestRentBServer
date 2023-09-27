import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../auth/repositories/user.repository';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { NotificationService } from '../notification/services/notification.service';
import { WithdrawalsAdminController } from './controllers/admin/withdrawals.admin.controller';
import { WalletTransactionsRepository } from './repositories/wallet-transactions.repository';
import { WithdrawalsRepository } from './repositories/withdrawals.repository';
import { WithdrawalsAdminService } from './services/admin/withdrawals.admin.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmCustomModule.forFeature([
      WithdrawalsRepository,
      WalletTransactionsRepository,
      UserRepository,
      NotificationService,
    ]),
  ],
  providers: [WithdrawalsAdminService],
  controllers: [WithdrawalsAdminController],
})
export class WithdrawalsModule {}
