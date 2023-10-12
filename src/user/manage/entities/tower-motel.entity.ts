// src/tower-motel/tower-motel.entity.ts

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tower_motels')
export class TowerMotel {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  tower_id: number;

  @Column({ type: 'bigint', unsigned: true })
  motel_id: number;

  @Column({ type: 'int', nullable: true })
  status: number;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'int', default: 0, name: 'is_room' })
  is_room: number;
}
