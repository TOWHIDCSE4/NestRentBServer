import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('address_additions')
export class AddressAddition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  province: number;

  @Column()
  district: number;

  @Column()
  wards: number;

  @Column()
  address_detail: string;

  @Column()
  note: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
