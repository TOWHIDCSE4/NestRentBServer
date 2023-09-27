import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationReqDto } from '../dtos/req/noti.req.dto';
import { NotificationService } from '../services/notification.service';

@Controller('notification')
@ApiTags('Notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  test(@Body() body: NotificationReqDto) {
    return this.notificationService.handle(body);
  }
}
