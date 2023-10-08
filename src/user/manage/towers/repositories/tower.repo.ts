import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../../common/repositories/base.repositories';
import { Tower } from '../entities/tower.entity';

@Injectable()
export class TowerRepository extends BaseRepository<Tower> {
  constructor(dataSource: DataSource) {
    super(Tower, dataSource);
  }
}
