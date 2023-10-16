import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin_discover_item_uis')
export class AdminDiscoverItemUi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'admin_discover_id' })
  adminDiscoverId: number;

  @Column()
  content: string;

  @Column()
  image: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column({ name: 'district_name' })
  districtName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
