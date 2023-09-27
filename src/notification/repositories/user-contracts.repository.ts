import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { UserContracts } from '../entities/user-contracts.entity';

@Injectable()
export class UserContractsRepository extends BaseRepository<UserContracts> {
  constructor(dataSource: DataSource) {
    super(UserContracts, dataSource);
  }
}
