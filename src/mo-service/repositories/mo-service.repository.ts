import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { MoService } from '../entities/mo-service';

@Injectable()
export class MoServiceRepository extends BaseRepository<MoService> {
  constructor(dataSource: DataSource) {
    super(MoService, dataSource);
  }
}
