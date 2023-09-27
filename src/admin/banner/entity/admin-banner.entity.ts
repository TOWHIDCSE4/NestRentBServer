import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin_banners')
export class DBAdminBanner {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191, nullable: true })
  image_url: string | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  title: string | null;

  @Column({ type: 'varchar', length: 191, nullable: true })
  action_link: string | null;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  created_at: Date | null;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updated_at: Date | null;
}
