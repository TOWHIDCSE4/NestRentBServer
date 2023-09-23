import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('services')
export class Service {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ length: 191, default: '0' })
  service_name: string;

  @Column({ length: 191, default: '0' })
  service_icon: string;

  @Column({ length: 191, default: '0' })
  service_unit: string;

  @Column({ type: 'double', default: 0 })
  service_charge: number;

  @Column({ type: 'longtext', nullable: true })
  note: string | null;

  @Column({ type: 'int', default: 0 })
  type_unit: number;

  @Column({ type: 'tinyint', default: 0 })
  is_default: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;
}
