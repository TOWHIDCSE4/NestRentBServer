import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'area_code', type: 'varchar', nullable: true })
  area_code?: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: true })
  phone_number?: string;

  @Column({ name: 'phone_verified_at', nullable: true, type: 'timestamp' })
  phone_verified_at?: Date;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, type: 'timestamp', name: 'date_of_birth' })
  date_of_birth?: Date;

  @Column({ name: 'avatar_image', nullable: true, type: 'varchar' })
  avatar_image?: string;

  @Column({ type: 'int', default: 0 })
  sex: number;

  @Column({ type: 'int', default: 0 })
  permission: number;

  @Column({ name: 'remember_token', type: 'varchar' })
  remember_token: string;

  @Column({ type: 'int', default: 2 })
  status: number;

  @Column({ name: 'golden_coin', type: 'double', default: 0 })
  golden_coin: number;

  @Column({ name: 'silver_coin', type: 'double', default: 0 })
  silver_coin: number;

  @Column({ name: 'is_host', type: 'tinyint', nullable: true })
  is_host?: number;

  @Column({ name: 'is_admin', type: 'tinyint', default: 0 })
  is_admin: number;

  @Column({ name: 'host_rank', type: 'int', default: 0 })
  host_rank: number;

  @Column({ name: 'social_id', type: 'text', nullable: true })
  social_id?: string;

  @Column({ name: 'social_from', type: 'varchar', nullable: true })
  social_from?: string;

  @Column({ name: 'has_post', type: 'tinyint', default: 0 })
  has_post: number;

  @Column({ name: 'account_rank', type: 'tinyint', default: 0 })
  account_rank: number;

  @Column({ name: 'service_default', type: 'tinyint', default: 0 })
  service_default: number;

  @Column({ name: 'is_choosed_decent', type: 'tinyint', default: 0 })
  is_choosed_decent: number;

  @Column({ name: 'is_authorized', type: 'tinyint', default: 0 })
  is_authorized: number;

  @Column({ name: 'referral_code', type: 'varchar', nullable: true })
  referral_code?: string;

  @Column({ name: 'self_referral_code', type: 'varchar', nullable: true })
  self_referral_code?: string;

  @Column({ name: 'has_referral_code', type: 'tinyint', default: 0 })
  has_referral_code: number;

  @Column({ name: 'cmnd_number', type: 'varchar', nullable: true })
  cmnd_number?: string;

  @Column({ name: 'cmnd_front_image_url', type: 'varchar', nullable: true })
  cmnd_front_image_url?: string;

  @Column({ name: 'cmnd_back_image_url', type: 'varchar', nullable: true })
  cmnd_back_image_url?: string;

  @Column({ name: 'bank_account_number', type: 'varchar', nullable: true })
  bank_account_number?: string;

  @Column({ name: 'bank_account_name', type: 'varchar', nullable: true })
  bank_account_name?: string;

  @Column({ name: 'bank_name', type: 'varchar', nullable: true })
  bank_name?: string;

  @Column({ name: 'initial_account_type', type: 'tinyint', default: 0 })
  initial_account_type: number;
}
