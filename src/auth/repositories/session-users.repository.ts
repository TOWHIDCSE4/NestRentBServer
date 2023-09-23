import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { SessionUsers } from '../entities/session-users.entity';

@Injectable()
export class SessionUsersRepository extends BaseRepository<SessionUsers> {
  constructor(dataSource: DataSource) {
    super(SessionUsers, dataSource);
  }
}
