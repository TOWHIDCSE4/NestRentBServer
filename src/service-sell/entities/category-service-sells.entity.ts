import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ServiceSells } from './service-sell.entity';

@Entity('category_service_sells')
export class CategoryServiceSells extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'varchar', nullable: true })
  image?: string;

  @Column({ name: 'is_active', type: 'tinyint', default: 1 })
  is_active: number;

  @OneToMany(
    () => ServiceSells,
    (serviceSells) => serviceSells.category_service_sell,
  )
  service_sells: ServiceSells[];
}
