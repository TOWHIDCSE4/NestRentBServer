import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { UserDeviceTokens } from '../entities/user-device-token.entity';

@Injectable()
export class UserDeviceTokensRepository extends BaseRepository<UserDeviceTokens> {
  constructor(dataSource: DataSource) {
    super(UserDeviceTokens, dataSource);
  }
}
