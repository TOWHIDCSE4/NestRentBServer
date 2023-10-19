import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mo_posts')
export class MoPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  motel_id: number;

  @Column()
  tower_id: number;

  @Column()
  phone_number: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  motel_name: string;

  @Column()
  tower_name: string;

  @Column()
  capacity: number;

  @Column()
  sex: string;

  @Column()
  area: number;

  @Column()
  money: number;

  @Column()
  min_money: number;

  @Column()
  max_money: number;

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
  unit: string;

  @Column('simple-array')
  images: string[];

  @Column()
  type: string;

  @Column('simple-json', { nullable: true })
  mo_services: Record<string, any>;

  @Column()
  status: string;

  @Column()
  note: string;

  @Column()
  admin_verified: boolean;

  @Column()
  available_motel: boolean;

  @Column()
  link_video: string;

  @Column()
  quantity_vehicle_parked: number;

  @Column()
  number_floor: number;

  @Column()
  has_sofa: boolean;

  @Column()
  furniture: string;

  @Column()
  number_calls: number;

  @Column()
  money_commission_user: number;

  @Column()
  money_commission_admin: number;

  @Column()
  admin_confirm_commission: boolean;

  @Column()
  percent_commission: number;

  @Column()
  percent_commission_collaborator: number;

  @Column()
  time_push: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
