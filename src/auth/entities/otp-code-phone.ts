import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('otp_code_phones')
export class OtpCodePhone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: true })
  area_code: string | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  otp: string | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  phone: string | null;

  @Column({ type: 'timestamp', nullable: true, name: 'time_generate' })
  time_generate: Date | null;

  @Column({ type: 'longtext', nullable: true })
  content: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
