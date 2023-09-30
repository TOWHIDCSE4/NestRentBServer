import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Contract } from './contract.entity'; // Import your Contract entity
  
  @Entity('motels')
  export class Motel {
    @PrimaryGeneratedColumn()
    id: number;
  
    // Add other motel fields here based on your table structure
  
    @OneToMany(() => Contract, (contract) => contract.motel)
    contracts: Contract[];
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created_at: Date;

    @Column({ type: 'varchar', length: 191, nullable: true })
    motel_name: string | null;

    @Column({ type: 'varchar', length: 191, nullable: true })
    phone_number: string | null;
  
    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated_at: Date;
  }