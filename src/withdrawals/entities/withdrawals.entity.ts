import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('withdrawals')
export class Withdrawals extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: true })
  user_id?: number;

  @Column({ type: 'bigint', nullable: true })
  admin_id?: number;

  @Column({ type: 'double', nullable: true })
  amount_money?: number;

  @Column({ type: 'int', nullable: true })
  status?: number;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @Column({ type: 'timestamp', nullable: true })
  date_withdrawal_approved?: Date;
}
