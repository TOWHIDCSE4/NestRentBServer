import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address_additions')
export class AddressAddition {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  wards: string;

  @Column({ name: 'address_detail' })
  addressDetail: string;

  @Column()
  note: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
