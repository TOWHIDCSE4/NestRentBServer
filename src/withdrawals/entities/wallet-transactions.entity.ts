import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DecimalColumn } from '../../common/decorators/typeorm.decorator';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('wallet_transactions')
export class WalletTransactions extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'varchar', nullable: true })
  account_number?: string;

  @Column({ type: 'varchar', nullable: true })
  bank_account_holder_name?: string;

  @Column({ type: 'varchar', nullable: true })
  bank_name?: string;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @DecimalColumn({ scale: 2, precision: 8, default: 0.0 })
  rest_money: number;

  @Column({ type: 'int', nullable: true })
  otp_code?: number;

  @DecimalColumn({ scale: 2, precision: 8, default: 0.0 })
  deposit_money: number;

  @Column({ type: 'varchar', nullable: true })
  deposit_trading_code?: string;

  @Column({ type: 'timestamp', nullable: true })
  deposit_date_time?: Date;

  @Column({ type: 'varchar', nullable: true })
  deposit_content?: string;

  @DecimalColumn({ scale: 2, precision: 8, default: 0.0 })
  withdraw_money: number;

  @Column({ type: 'varchar', nullable: true })
  withdraw_trading_code?: string;

  @Column({ type: 'timestamp', nullable: true })
  withdraw_date_time?: Date;

  @Column({ type: 'varchar', nullable: true })
  withdraw_content?: string;

  @DecimalColumn({ scale: 2, precision: 8, default: 0.0 })
  bonus: number;

  @Column({ type: 'tinyint' })
  type: number;

  @Column({ type: 'tinyint', default: 0 })
  status: number;
}
