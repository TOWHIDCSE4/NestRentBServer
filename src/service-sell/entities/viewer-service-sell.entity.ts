import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ServiceSells } from './service-sell.entity';

@Entity('viewer_service_sell')
export class ViewerServiceSell extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ name: 'service_sell_id', type: 'bigint' })
  service_sell_id: number;

  @ManyToOne(
    () => ServiceSells,
    (serviceSell) => serviceSell.viewer_service_sell,
  )
  @JoinColumn({ name: 'service_sell_id' })
  service_sell: ServiceSells;
}
