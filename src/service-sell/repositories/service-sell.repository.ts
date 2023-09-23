import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { ServiceSells } from '../entities/service-sell.entity';

@Injectable()
export class ServiceSellsRepository extends BaseRepository<ServiceSells> {
  constructor(dataSource: DataSource) {
    super(ServiceSells, dataSource);
  }
}
