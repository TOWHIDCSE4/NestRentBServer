import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../../auth/entities/user.entity';
import { Contract } from './contract.entity';
import { Motel } from './motel.entity';

@Entity('user_contracts')
export class UserContract {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userContracts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Motel, (motel) => motel.userContracts)
  @JoinColumn({ name: 'motel_id' })
  motel: Motel;

  @ManyToOne(() => Contract, (contract) => contract.userContract)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @Column({ name: 'renter_phone_number', type: 'varchar', length: 191 })
  renterPhoneNumber: string;

  @Column({ type: 'tinyint', default: 0, name: 'is_represent' })
  isRepresent: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
