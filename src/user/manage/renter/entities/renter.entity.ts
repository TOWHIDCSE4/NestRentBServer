import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('renters')
export class Renter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column()
  name: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'cmnd_number', nullable: true })
  cmndNumber: string;

  @Column({ name: 'cmnd_front_image_url', nullable: true })
  cmndFrontImageUrl: string;

  @Column({ name: 'cmnd_back_image_url', nullable: true })
  cmndBackImageUrl: string;

  @Column({ nullable: true })
  address: string;

  @Column({ name: 'has_contract', default: false })
  hasContract: boolean;

  @Column({ name: 'motel_name', nullable: true })
  motelName: string;

  @Column({ name: 'name_tower_expected', nullable: true })
  nameTowerExpected: string;

  @Column({ name: 'name_motel_expected', nullable: true })
  nameMotelExpected: string;

  @Column({ name: 'price_expected', default: 0 })
  priceExpected: number;

  @Column({ name: 'deposit_expected', default: 0 })
  depositExpected: number;

  @Column({ name: 'estimate_rental_period', nullable: true })
  estimateRentalPeriod: string;

  @Column({ name: 'estimate_rental_date', nullable: true })
  estimateRentalDate: Date;

  @Column({ name: 'tower_id', nullable: true })
  towerId: number;

  @Column({ name: 'motel_id', nullable: true })
  motelId: number;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ name: 'is_hidden', default: false })
  isHidden: boolean;

  @Column({ name: 'date_of_birth', nullable: true })
  dateOfBirth: Date;

  @Column({ name: 'date_range', nullable: true })
  dateRange: Date;

  @Column({ default: 0 })
  sex: number;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  type: string;

  @Column({ name: 'type_from', default: 0 })
  typeFrom: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
