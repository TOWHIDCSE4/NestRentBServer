import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('towers')
export class Tower {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: string;

  @Column({ type: 'bigint', name: 'user_id' })
  userId: number;

  @Column({ type: 'int', default: 0 })
  type: number;

  @Column({ type: 'int', default: 2 })
  status: number;

  @Column({ type: 'tinyint', default: 0 })
  accuracy: number;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
    name: 'phone_number',
    collation: 'utf8mb4_unicode_ci',
  })
  phoneNumber: string | null;

  @Column({ type: 'longtext', nullable: true, collation: 'utf8mb4_unicode_ci' })
  description: string | null;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
    name: 'tower_name',
    collation: 'utf8mb4_unicode_ci',
  })
  towerName: string | null;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
    name: 'tower_name_filter',
    collation: 'utf8mb4_unicode_ci',
  })
  towerNameFilter: string | null;

  @Column({ type: 'int', default: 1 })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  sex: number;

  @Column({ type: 'double', default: 0 })
  area: number;

  @Column({ type: 'double', default: 0 })
  money: number;

  @Column({ type: 'double', default: 0, name: 'min_money' })
  minMoney: number;

  @Column({ type: 'double', default: 0, name: 'max_money' })
  maxMoney: number;

  @Column({ type: 'double', default: 0 })
  deposit: number;

  @Column({ type: 'double', default: 0, name: 'electric_money' })
  electricMoney: number;

  @Column({ type: 'double', default: 0, name: 'water_money' })
  waterMoney: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_wifi' })
  hasWifi: number;

  @Column({ type: 'double', default: 0, name: 'wifi_money' })
  wifiMoney: number;

  @Column({ type: 'tinyint', default: 1, name: 'has_park' })
  hasPark: number;

  @Column({ type: 'double', default: 0, name: 'park_money' })
  parkMoney: number;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
    name: 'video_link',
    collation: 'utf8mb4_unicode_ci',
  })
  videoLink: string | null;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
    name: 'province_name',
    collation: 'utf8mb4_unicode_ci',
  })
  provinceName: string | null;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
    name: 'district_name',
    collation: 'utf8mb4_unicode_ci',
  })
  districtName: string | null;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
    name: 'wards_name',
    collation: 'utf8mb4_unicode_ci',
  })
  wardsName: string | null;

  @Column({ type: 'int', nullable: true })
  province: number | null;

  @Column({ type: 'int', nullable: true })
  district: number | null;

  @Column({ type: 'int', nullable: true })
  wards: number | null;

  @Column({
    type: 'varchar',
    length: 191,
    nullable: true,
    name: 'address_detail',
    collation: 'utf8mb4_unicode_ci',
  })
  addressDetail: string | null;

  @Column({ type: 'tinyint', default: 0, name: 'has_wc' })
  hasWc: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_window' })
  hasWindow: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_security' })
  hasSecurity: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_free_move' })
  hasFreeMove: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_own_owner' })
  hasOwnOwner: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_air_conditioner' })
  hasAirConditioner: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_water_heater' })
  hasWaterHeater: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_kitchen' })
  hasKitchen: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_fridge' })
  hasFridge: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_washing_machine' })
  hasWashingMachine: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_mezzanine' })
  hasMezzanine: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_bed' })
  hasBed: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_wardrobe' })
  hasWardrobe: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_tivi' })
  hasTivi: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_pet' })
  hasPet: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_balcony' })
  hasBalcony: number;

  @Column({ type: 'int', default: 0, name: 'hour_open' })
  hourOpen: number;

  @Column({ type: 'int', default: 0, name: 'minute_open' })
  minuteOpen: number;

  @Column({ type: 'int', default: 0, name: 'hour_close' })
  hourClose: number;

  @Column({ type: 'int', default: 0, name: 'minute_close' })
  minuteClose: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_finger_print' })
  hasFingerPrint: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_kitchen_stuff' })
  hasKitchenStuff: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_table' })
  hasTable: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_decorative_lights' })
  hasDecorativeLights: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_picture' })
  hasPicture: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_tree' })
  hasTree: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_pillow' })
  hasPillow: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_mattress' })
  hasMattress: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_shoes_racks' })
  hasShoesRacks: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_curtain' })
  hasCurtain: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_mirror' })
  hasMirror: number;

  @Column({ type: 'longtext', nullable: true, collation: 'utf8mb4_unicode_ci' })
  images: string | null;

  @Column({ type: 'tinyint', default: 0, name: 'admin_verified' })
  adminVerified: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_post' })
  hasPost: number;

  @Column({ type: 'int', default: 1, name: 'number_floor' })
  numberFloor: number;

  @Column({ type: 'int', default: 0, name: 'quantity_vehicle_parked' })
  quantityVehicleParked: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_sofa' })
  hasSofa: number;

  @Column({ type: 'tinyint', default: 1, name: 'has_contract' })
  hasContract: number;

  @Column({ type: 'tinyint', default: 0, name: 'percent_commission' })
  percentCommission: number;

  @Column({
    type: 'tinyint',
    default: 0,
    name: 'percent_commission_collaborator',
  })
  percentCommissionCollaborator: number;

  @Column({ type: 'tinyint', default: 0, name: 'money_commission_admin' })
  moneyCommissionAdmin: number;

  @Column({ type: 'tinyint', default: 0, name: 'money_commission_user' })
  moneyCommissionUser: number;

  @Column({ type: 'tinyint', default: 0, name: 'has_ceiling_fans' })
  hasCeilingFans: number;

  @Column({ type: 'longtext', nullable: true, collation: 'utf8mb4_unicode_ci' })
  furniture: string | null;

  @CreateDateColumn({ type: 'timestamp', nullable: true, name: 'created_at' })
  createdAt: Date | null;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, name: 'updated_at' })
  updatedAt: Date | null;
}
