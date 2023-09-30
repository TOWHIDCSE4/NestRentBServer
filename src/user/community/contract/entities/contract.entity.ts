import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Motel } from './motel.entity';
import { User } from '../../../../auth/entities/user.entity';
import { UserContract } from './user-contracts.entity';
  
  @Entity('contracts')
  export class Contract {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.contracts)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => User, (user) => user.createdContracts)
    @JoinColumn({ name: 'user_maker_id' })
    userMaker: User;
  
    @ManyToOne(() => Motel, (motel) => motel.contracts)
    @JoinColumn({ name: 'motel_id' })
    motel: Motel;
  
    @Column({ type: 'bigint', unsigned: true })
    tower_id: number;
  
    @Column({ type: 'timestamp', nullable: true })
    rent_from: Date | null;
  
    @Column({ type: 'timestamp', nullable: true })
    rent_to: Date | null;
  
    @Column({ type: 'int', default: 1 })
    payment_space: number;
  
    @Column({ type: 'double', default: 1 })
    money: number;
  
    @Column({ type: 'double', default: 1 })
    deposit_money: number;
  
    @Column({ type: 'varchar', length: 191, nullable: true })
    cmnd_number: string | null;
  
    @Column({ type: 'varchar', length: 191, nullable: true })
    cmnd_front_image_url: string | null;
  
    @Column({ type: 'varchar', length: 191, nullable: true })
    cmnd_back_image_url: string | null;
  
    @Column({ type: 'int', default: 2 })
    status: number;
  
    @Column({ type: 'timestamp', nullable: true })
    pay_start: Date | null;
  
    @Column({ type: 'longtext', nullable: true })
    images: string | null;
  
    @Column({ type: 'longtext', nullable: true })
    mo_services: string | null;
  
    @Column({ type: 'varchar', length: 191, nullable: true })
    note: string | null;
  
    @Column({ type: 'double', default: 0 })
    deposit_amount_paid: number;
  
    @Column({ type: 'longtext', nullable: true })
    images_deposit: string | null;
  
    @Column({ type: 'longtext', nullable: true })
    furniture: string | null;
  
    @Column({ type: 'timestamp', nullable: true })
    deposit_payment_date: Date | null;
  
    @Column({ type: 'timestamp', nullable: true })
    deposit_used_date: Date | null;
  
    @Column({ type: 'double', nullable: true })
    deposit_actual_paid: number | null;
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated_at: Date;

    @OneToMany(() => UserContract, (contract) => contract.user)
    userContracts: UserContract[];
  }