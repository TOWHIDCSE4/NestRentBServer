import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('collaborator_refer_motels')
export class CollaboratorReferMotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  user_referral_id: number;

  @Column()
  contract_id: number;

  @Column()
  motel_id: number;

  @Column()
  date_refer_success: Date;

  @Column()
  money_commission_admin: number;

  @Column()
  money_commission_user: number;

  @Column()
  description: string;

  @Column()
  status: number;

  @Column()
  status_commission_collaborator: number;

  @Column()
  first_receive_commission: boolean;

  @Column()
  images_host_paid: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
