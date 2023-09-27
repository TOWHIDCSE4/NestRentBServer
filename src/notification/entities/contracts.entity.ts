import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('contracts')
export class Contracts extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint', nullable: true })
  user_maker_id?: number;

  @Column({ type: 'bigint' })
  motel_id: number;

  @Column({ type: 'bigint', nullable: true })
  tower_id?: number;

  @Column({ type: 'timestamp' })
  rent_from?: Date;

  @Column({ type: 'timestamp' })
  rent_to?: Date;

  @Column({ type: 'int', default: 1 })
  payment_space: number;

  @Column({ type: 'double', default: 1, nullable: true })
  money?: number;

  @Column({ type: 'double', default: 1, nullable: true })
  deposit_money?: number;

  @Column({ type: 'varchar', nullable: true })
  cmnd_number?: string;

  @Column({ type: 'varchar', nullable: true })
  cmnd_front_image_url?: string;

  @Column({ type: 'varchar', nullable: true })
  cmnd_back_image_url?: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  status?: number;

  @Column({ type: 'timestamp', nullable: true })
  pay_start?: Date;

  @Column({ type: 'longtext', nullable: true })
  images?: string;

  @Column({ type: 'longtext', nullable: true })
  mo_services?: string;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @Column({ type: 'double', nullable: true, default: 0 })
  deposit_amount_paid?: number;

  @Column({ type: 'longtext', nullable: true })
  images_deposit?: string;

  @Column({ type: 'longtext', nullable: true })
  furniture?: string;

  @Column({ type: 'timestamp', nullable: true })
  deposit_payment_date?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deposit_used_date?: Date;

  @Column({ type: 'double', nullable: true })
  deposit_actual_paid?: number;
}
