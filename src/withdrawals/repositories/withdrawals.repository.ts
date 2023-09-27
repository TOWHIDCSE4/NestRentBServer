import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Withdrawals } from '../entities/withdrawals.entity';

@Injectable()
export class WithdrawalsRepository extends BaseRepository<Withdrawals> {
  constructor(dataSource: DataSource) {
    super(Withdrawals, dataSource);
  }
}
