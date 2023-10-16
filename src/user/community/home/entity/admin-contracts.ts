import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin_contacts')
export class AdminContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facebook: string;

  @Column()
  zalo: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  hotline: string;

  @Column()
  bank_account_number: string;

  @Column()
  bank_account_name: string;

  @Column()
  bank_name: string;

  @Column()
  content: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
