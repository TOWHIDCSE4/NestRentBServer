import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Transactional } from 'typeorm-transactional';
import { EventEmitterName } from '../../common/enums/app.enum';
import { NotificationReqDto } from '../dtos/req/noti.req.dto';
import { NotificationService } from './notification.service';

@Injectable()
export class NotiListenerService {
  constructor(private notificationService: NotificationService) {}

  @Transactional()
  @OnEvent(EventEmitterName.NOTIFICATION)
  async pushNotification(noti: NotificationReqDto) {
    await this.notificationService.handle(noti);
  }
}
