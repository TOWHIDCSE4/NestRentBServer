import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServiceRepository extends BaseRepository<Service> {
  constructor(dataSource: DataSource) {
    super(Service, dataSource);
  }
}
