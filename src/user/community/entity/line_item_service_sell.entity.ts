import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('line_item_service_sells')
export class LineItemServiceSell {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', name: 'category_service_sell_id' })
  categoryServiceSell_id: number;

  @Column({ type: 'bigint', name: 'user_id' })
  user_id: number;

  @Column({ type: 'bigint', name: 'order_service_sell_id' })
  orderServiceSell_id: number;

  @Column({ type: 'bigint', name: 'service_sell_id' })
  service_sell_id: number;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 0 })
  item_price: number;

  @Column('longtext', { nullable: true })
  images: string | null;

  @Column({ default: 0 })
  total_price: number;

  @Column({ nullable: true })
  name_service_sell: string | null;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
