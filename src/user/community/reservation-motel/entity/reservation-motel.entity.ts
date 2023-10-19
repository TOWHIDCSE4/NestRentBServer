import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservation_motels')
export class ReservationMotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  note: string;

  @Column()
  province_name: string;

  @Column()
  wards_name: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  wards: string;

  @Column()
  status: number;

  @Column()
  address_detail: string;

  @Column()
  phone_number: string;

  @Column()
  district_name: string;

  @Column()
  user_id: number;

  @Column()
  mo_post_id: number;

  @Column()
  host_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
