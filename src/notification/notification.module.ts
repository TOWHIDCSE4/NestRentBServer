import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserDeviceTokensRepository } from '../auth/repositories/user-device-tokens.repository';
import { UserRepository } from '../auth/repositories/user.repository';
import { TypeOrmCustomModule } from '../common/typeorm-custom';
import { NotificationController } from './controllers/notification.controller';
import { ContractsRepository } from './repositories/contracts.repository';
import { NotificationUsersRepository } from './repositories/notification-users.repository';
import { UserContractsRepository } from './repositories/user-contracts.repository';
import { CronNotification } from './services/cron-noti.service';
import { NotiListenerService } from './services/noti.listener.service';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [
    HttpModule,
    // BullModule.registerQueue(...bullQueues),
    TypeOrmCustomModule.forFeature([
      UserDeviceTokensRepository,
      UserRepository,
      NotificationUsersRepository,
      ContractsRepository,
      UserContractsRepository,
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotiListenerService, CronNotification],
})
export class NotificationModule {}
