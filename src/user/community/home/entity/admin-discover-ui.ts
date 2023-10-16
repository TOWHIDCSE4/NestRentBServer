import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin_discover_uis')
export class AdminDiscoverUi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  province: string;

  @Column({ name: 'province_name' })
  provinceName: string;

  @Column()
  image: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
