import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../common/repositories/base.repositories';
import { Renter } from '../entities/renter.entity';

@Injectable()
export class RenterRepository extends BaseRepository<Renter> {
  constructor(dataSource: DataSource) {
    super(Renter, dataSource);
  }
}
