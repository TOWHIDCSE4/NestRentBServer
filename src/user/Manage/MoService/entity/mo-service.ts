import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('mo_services')
export class MoService {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  motel_id: number;

  @Column({ type: 'varchar', length: 191, nullable: true })
  service_name: string | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  service_icon: string | null;

  @Column({ type: 'varchar', length: 191, default: '0' })
  service_unit: string;

  @Column({ type: 'double', default: 0 })
  service_charge: number;

  @Column({ type: 'longtext', nullable: true })
  note: string | null;

  @Column({ type: 'int', default: 0 })
  type_unit: number;

  @Column({ type: 'longtext', nullable: true })
  images: string | null;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Timestamp;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Timestamp;
}
