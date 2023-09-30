import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceSells } from '../../../service-sell/entities/service-sell.entity';

@Entity('item_cart_service_sells')
export class ItemCartServiceSell {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint' }) // Define the relationship with the User entity
  user_id: number;

  @ManyToOne(() => ServiceSells, { eager: true }) // Define the relationship with the ServiceSell entity
  serviceSell: ServiceSells;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 0 })
  item_price: number;

  @Column('longtext', { nullable: true })
  images: string | null;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
