import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('user_contracts')
export class UserContracts extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  motel_id: number;

  @Column({ type: 'bigint' })
  contract_id: number;

  @Column({ type: 'varchar' })
  renter_phone_number: string;

  @Column({ type: 'tinyint', nullable: true })
  is_represent?: number;
}
