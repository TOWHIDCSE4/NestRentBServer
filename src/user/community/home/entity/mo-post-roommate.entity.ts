import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mo_post_roommates')
export class MoPostRoommate {
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
  deposit: number;

  @Column()
  electric_money: number;

  @Column()
  water_money: number;

  @Column()
  has_wifi: boolean;

  @Column()
  wifi_money: number;

  @Column()
  has_park: boolean;

  @Column()
  park_money: number;

  @Column()
  province_name: string;

  @Column()
  district_name: string;

  @Column()
  wards_name: string;

  @Column()
  number_tenant_current: number;

  @Column()
  number_find_tenant: number;

  @Column()
  floor: number;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  wards: string;

  @Column()
  address_detail: string;

  @Column()
  has_wc: boolean;

  @Column()
  has_window: boolean;

  @Column()
  has_security: boolean;

  @Column()
  has_free_move: boolean;

  @Column()
  has_own_owner: boolean;

  @Column()
  has_air_conditioner: boolean;

  @Column()
  has_water_heater: boolean;

  @Column()
  has_kitchen: boolean;

  @Column()
  has_fridge: boolean;

  @Column()
  has_washing_machine: boolean;

  @Column()
  has_mezzanine: boolean;

  @Column()
  has_bed: boolean;

  @Column()
  has_wardrobe: boolean;

  @Column()
  has_tivi: boolean;

  @Column()
  has_pet: boolean;

  @Column()
  has_balcony: boolean;

  @Column()
  hour_open: number;

  @Column()
  minute_open: number;

  @Column()
  hour_close: number;

  @Column()
  minute_close: number;

  @Column()
  has_finger_print: boolean;

  @Column()
  has_kitchen_stuff: boolean;

  @Column()
  has_table: boolean;

  @Column()
  has_decorative_lights: boolean;

  @Column()
  has_picture: boolean;

  @Column()
  has_tree: boolean;

  @Column()
  has_pillow: boolean;

  @Column()
  has_mattress: boolean;

  @Column()
  has_curtain: boolean;

  @Column()
  has_ceiling_fans: boolean;

  @Column()
  has_mirror: boolean;

  @Column()
  has_sofa: boolean;

  @Column()
  unit: string;

  @Column()
  images: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
