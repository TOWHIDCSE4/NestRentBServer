import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repositories';
import { CategoryServiceSells } from '../entities/category-service-sells.entity';

@Injectable()
export class CategoryServiceSellsRepository extends BaseRepository<CategoryServiceSells> {
  constructor(dataSource: DataSource) {
    super(CategoryServiceSells, dataSource);
  }
}
