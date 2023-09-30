import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../../auth/entities/user.entity';
import { ServiceSells } from '../../../service-sell/entities/service-sell.entity';

@Entity('line_item_service_sells')
export class LineItemServiceSell {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint' })
  categoryServiceSell_id: number;

  @ManyToOne(() => User, { eager: true }) // Define the relationship with the User entity
  user: User;

  @Column({ type: 'bigint' })
  orderServiceSell_id: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 0 })
  item_price: number;

  @Column('longtext', { nullable: true })
  images: string | null;

  @ManyToOne(() => ServiceSells, { eager: true }) // Define the relationship with the ServiceSell entity
  serviceSell: ServiceSells;

  @Column({ default: 0 })
  total_price: number;

  @Column({ nullable: true })
  name_service_sell: string | null;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
