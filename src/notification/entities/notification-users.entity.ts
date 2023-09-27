import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('notification_users')
export class NotificationUsers extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'varchar', nullable: true })
  type?: string;

  @Column({ type: 'tinyint', nullable: true })
  unread?: number;

  @Column({ type: 'varchar', nullable: true })
  references_value?: string;

  @Column({ type: 'bigint', nullable: true })
  user_id?: number;

  @Column({ type: 'int', nullable: true })
  role?: number;
}
