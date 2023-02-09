import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/auth/entities/user.entity';

@Entity('player')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  height: number;

  @Column({ nullable: false })
  weight: number;

  @Column({ nullable: true })
  school: string;

  @Column({ nullable: true })
  zipcode: number;

  @OneToOne(() => User)
  @JoinColumn()
  playerDetails: User;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
