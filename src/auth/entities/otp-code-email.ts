import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class OtpCodeEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'time_generate', nullable: true, type: 'timestamp' })
  time_generate: Date;

  @Column({ nullable: true, type: 'longtext' })
  content: string;

  @Column({ name: 'created_at', nullable: true, type: 'timestamp' })
  created_at: Timestamp;

  @Column({ name: 'updated_at', nullable: true, type: 'timestamp' })
  updated_at: Timestamp;
}
