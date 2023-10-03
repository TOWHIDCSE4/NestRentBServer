// order-service-sell.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_service_sells')
export class OrderServiceSell {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'user_id' })
  user_id: number;

  @Column({ type: 'decimal', name: 'total_final', precision: 10, scale: 2 })
  total_final: number;

  @Column({ type: 'varchar', name: 'order_status', length: 255 })
  order_status: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  order_code: string;

  @Column({ type: 'varchar', name: 'payment_status', length: 255 })
  payment_status: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', name: 'province', length: 255 })
  province: string;

  @Column({ type: 'varchar', name: 'address_detail', length: 255 })
  address_detail: string;

  @Column({ type: 'varchar', name: 'note', length: 255 })
  note: string;

  @Column({ type: 'varchar', name: 'district', length: 255 })
  district: string;

  @Column({ type: 'varchar', name: 'wards', length: 255 })
  wards: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_shipping_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_before_discount: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  // Add more columns and relations as needed
}
