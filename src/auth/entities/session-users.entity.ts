import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('session_users')
export class SessionUsers extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  token: string;

  @Column({ name: 'refresh_token' })
  refresh_token: string;

  @Column({ name: 'token_expried' })
  token_expried: Date;

  @Column({ name: 'refresh_token_expried' })
  refresh_token_expried: Date;

  @Column({ name: 'user_id' })
  user_id: number;
}
