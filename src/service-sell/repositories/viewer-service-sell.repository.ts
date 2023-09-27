import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { ViewerServiceSell } from '../entities/viewer-service-sell.entity';

@Injectable()
export class ViewerServiceSellRepository extends BaseRepository<ViewerServiceSell> {
  constructor(dataSource: DataSource) {
    super(ViewerServiceSell, dataSource);
  }
}
