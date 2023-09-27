import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { WalletTransactions } from '../entities/wallet-transactions.entity';

@Injectable()
export class WalletTransactionsRepository extends BaseRepository<WalletTransactions> {
  constructor(dataSource: DataSource) {
    super(WalletTransactions, dataSource);
  }
}
