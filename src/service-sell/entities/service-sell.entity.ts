import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ItemCartServiceSell } from '../../user/community/entity/item-service-sell-entity';
import { CategoryServiceSells } from './category-service-sells.entity';
import { ViewerServiceSell } from './viewer-service-sell.entity';

@Entity('service_sells')
export class ServiceSells extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ name: 'name_str_filter', nullable: true })
  name_str_filter?: string;

  @Column({ type: 'longtext', nullable: true })
  images?: string;

  @Column({ type: 'double', nullable: true, default: 0 })
  price?: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  sold?: number;

  @Column({ type: 'int', nullable: true, default: 2 })
  status?: number;

  @Column({ name: 'seller_service_name', type: 'varchar', nullable: true })
  seller_service_name?: string;

  @Column({
    name: 'phone_number_seller_service',
    type: 'varchar',
    nullable: true,
  })
  phone_number_seller_service?: string;

  @Column({ name: 'service_sell_icon', type: 'varchar', nullable: true })
  service_sell_icon?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ name: 'category_service_sell_id', type: 'bigint' })
  category_service_sell_id: number;

  @ManyToOne(() => CategoryServiceSells, (cate) => cate.service_sells)
  @JoinColumn({ name: 'category_service_sell_id' })
  category_service_sell: CategoryServiceSells;

  @OneToMany(
    () => ViewerServiceSell,
    (viewerServiceSell) => viewerServiceSell.service_sell,
  )
  viewer_service_sell: ViewerServiceSell[];

  @OneToMany(
    () => ItemCartServiceSell,
    (itemCartServiceSell) => itemCartServiceSell.serviceSell,
  )
  itemCartServiceSells: ItemCartServiceSell[];
}
