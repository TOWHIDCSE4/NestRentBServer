import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Contracts } from '../entities/contracts.entity';

@Injectable()
export class ContractsRepository extends BaseRepository<Contracts> {
  constructor(dataSource: DataSource) {
    super(Contracts, dataSource);
  }
}
