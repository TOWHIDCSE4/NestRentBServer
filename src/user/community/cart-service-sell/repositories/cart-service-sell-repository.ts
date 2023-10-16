import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../../common/repositories/base.repositories';
import { ItemCartServiceSell } from '../entity/item-service-sell-entity';

@Injectable()
export class CartServiceSellRepository extends BaseRepository<ItemCartServiceSell> {
  constructor(dataSource: DataSource) {
    super(ItemCartServiceSell, dataSource);
  }
}
