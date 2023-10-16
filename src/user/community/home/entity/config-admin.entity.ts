import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('config_admins')
export class ConfigAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  current_version: string;

  @Column()
  type: string;

  @Column()
  intro_app: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
