import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { UserDeviceTokensRepository } from '../../auth/repositories/user-device-tokens.repository';
import { UserRepository } from '../../auth/repositories/user.repository';
import { generateRandomString } from '../../common/utils';
import { NotificationReqDto } from '../dtos/req/noti.req.dto';
import { TypeFCM } from '../enums/noti.enum';
import { NotificationUsersRepository } from '../repositories/notification-users.repository';

@Injectable()
export class NotificationService {
  constructor(
    private userDeviceTokensRepo: UserDeviceTokensRepository,
    private userRepo: UserRepository,
    private notificationUsersRepo: NotificationUsersRepository,
    private httpService: HttpService,
  ) {}

  async handle(noti: NotificationReqDto) {
    const { content, references_value, role, title, type, user_id } = noti;
    const userDeviceTokens = await this.userDeviceTokensRepo.findBy({
      user_id,
    });
    const deviceTokens = userDeviceTokens.map(
      (userDeviceToken) => userDeviceToken.device_token,
    );
    const data = {
      body: content,
      title,
      type,
      references_value,
    };

    if (type === TypeFCM.NEW_MESSAGE) {
      const user = await this.userRepo.findOneBy({
        id: Number(references_value),
      });
      data.title = `Bạn có tin nhắn mới từ ${user.name || ''}`;

      await this.notificationUsersRepo.delete({
        user_id,
        type: TypeFCM.NEW_MESSAGE,
      });
    }
    await this.notificationUsersRepo.save({
      user_id,
      content,
      title,
      type,
      role,
      unread: 1,
      references_value,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const splitToken = this.splitTokens(deviceTokens, 500);
    for (const listToken of splitToken) {
      const random = generateRandomString(5);
      await this.subscribeTopic(listToken, type + random);
      await this.sendNotification(data, type + random);
      await this.unsubscribeTopic(listToken, type + random);
    }
  }

  async subscribeTopic(deviceTokens: string[], topicName = null) {
    const url = 'https://iid.googleapis.com/iid/v1:batchAdd';

    const data = {
      to: `/topics/${topicName}`,
      registration_tokens: deviceTokens,
    };
    await this.execute(url, data);
  }

  private async execute(url: string, dataPost = {}, method = 'POST') {
    let result = false;
    try {
      const data = await this.httpService.axiosRef.post(url, dataPost, {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'key=' +
            'AAAACLGn77M:APA91bFub_lCosMGuMGpCEnfFMCwqI0sflPJBj1k5Oo-p3vsV0ZbXIh3cZVx-agSe0Fr6PIIuq9lIh9eWeLYI1WgVGOTFosumGcvvRCMlVrQ03Roa4P8HbshCYkO3EmbOBr2S20FriDl',
        },
      });
      result = data.status === HttpStatusCode.Ok;
    } catch (e) {
      console.log(e);
    }

    return result;
  }

  private splitTokens(deviceTokens: string[], chunkSize: number): string[][] {
    const splitToken = [];
    for (let i = 0; i < deviceTokens.length; i += chunkSize) {
      splitToken.push(deviceTokens.slice(i, i + chunkSize));
    }
    return splitToken;
  }

  async sendNotification(dataPost: any, topicName = null) {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const groupKey = 'group_message_key';

    const data = {
      to: `/topics/${topicName}`,
      notification: {
        body: dataPost?.body || 'Bạn có thông báo mới',
        title: dataPost?.title || 'Bạn có thông báo mới',
        image: null,
        sound: 'default',
        priority: 'high',
        android_channel_id: 'noti_push_app_1',
        content_available: true,
      },
      webpush: {
        headers: {
          Urgency: 'high',
        },
      },
      android: {
        priority: 'high',
      },
      priority: 'high',
      sound: 'alarm',
      data: {
        references_value: dataPost?.references_value || null,
        title: dataPost?.title || null,
        type: dataPost?.type || null,
        url: dataPost?.url || null,
        redirect_to: dataPost?.redirect_to || null,
        sound: 'alarm',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
      apns: {
        payload: {
          aps: {
            'mutable-content': 1,
            sound: 'default',
            badge: 1,
            // 'thread-id' => $groupKey,
          },
        },
        fcm_options: {
          image: dataPost?.image || null,
        },
      },
    };

    await this.execute(url, data);
  }

  async unsubscribeTopic(deviceTokens: string[], topicName = null) {
    const url = 'https://iid.googleapis.com/iid/v1:batchRemove';
    const data = {
      to: `/topics/${topicName}`,
      registration_tokens: deviceTokens,
    };

    await this.execute(url, data);
  }
}
