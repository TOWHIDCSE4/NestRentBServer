import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mo_post_find_motels')
export class MoPostFindMotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  motel_id: number;

  @Column()
  phone_number: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  motel_name: string;

  @Column()
  capacity: number;

  @Column()
  sex: string;

  @Column()
  area: number;

  @Column()
  money: number;

  @Column()
  money_from: number;

  @Column()
  money_to: number;

  @Column()
  deposit: number;

  @Column()
  electric_money: number;

  @Column()
  water_money: number;

  @Column()
  wifi_money: number;

  @Column()
  park_money: number;

  @Column()
  province_name: string;

  @Column()
  district_name: string;

  @Column()
  wards_name: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  wards: string;

  @Column()
  address_detail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
