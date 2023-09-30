import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contract } from '../community/contract/entities/contract.entity';
import { UserContract } from '../community/contract/entities/user-contracts.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: true })
  area_code: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  @Index()
  phone_number: string;

  @Column({ type: 'timestamp', nullable: true })
  phone_verified_at: Date;

  @Column({ type: 'varchar', length: 191, nullable: true })
  @Index()
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  email_verified_at: Date;

  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  name: string;

  @Column({ type: 'timestamp', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 191, nullable: true })
  avatar_image: string;

  @Column({ type: 'int', default: 0 })
  sex: number;

  @Column({ type: 'int', default: 0 })
  permission: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  remember_token: string;

  @Column({ type: 'int', default: 2 })
  status: number;

  @Column({ type: 'double', unsigned: true, default: 0 })
  golden_coin: number;

  @Column({ type: 'double', unsigned: true, default: 0 })
  silver_coin: number;

  @Column({ type: 'tinyint', nullable: true })
  is_host: number;

  @Column({ type: 'tinyint', default: 0 })
  is_admin: number;

  @Column({ type: 'int', default: 0 })
  host_rank: number;

  @Column({ type: 'text', nullable: true })
  social_id: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  social_from: string;

  @Column({ type: 'tinyint', default: 0 })
  has_post: number;

  @Column({ type: 'tinyint', default: 0 })
  account_rank: number;

  @Column({ type: 'tinyint', default: 0 })
  service_default: number;

  @Column({ type: 'tinyint', default: 0 })
  is_choosed_decent: number;

  @Column({ type: 'tinyint', default: 0 })
  is_authorized: number;

  @Column({ type: 'varchar', length: 191, nullable: true })
  referral_code: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  self_referral_code: string;

  @Column({ type: 'tinyint', default: 0 })
  has_referral_code: number;

  @Column({ type: 'varchar', length: 191, nullable: true })
  cmnd_number: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  cmnd_front_image_url: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  cmnd_back_image_url: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  bank_account_number: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  bank_account_name: string;

  @Column({ type: 'varchar', length: 191, nullable: true })
  bank_name: string;

  @Column({ type: 'tinyint', default: 0 })
  initial_account_type: number;

  @OneToMany(() => Contract, (contract) => contract.user)
  contracts: Contract[];

  @OneToMany(() => Contract, (contract) => contract.userMaker)
  createdContracts: Contract[];

  @OneToMany(() => UserContract, (contract) => contract.user)
  userContracts: UserContract[];

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
