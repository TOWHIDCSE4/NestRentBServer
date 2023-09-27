import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { NotificationUsers } from '../entities/notification-users.entity';

@Injectable()
export class NotificationUsersRepository extends BaseRepository<NotificationUsers> {
  constructor(dataSource: DataSource) {
    super(NotificationUsers, dataSource);
  }
}
