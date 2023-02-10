import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LeagueStatus } from 'src/common';

@Entity('league')
export class League {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  name: string;

  @Column({
    nullable: true,
    default:
      'https://thumbs.dreamstime.com/b/transparent-pattern-background-simulation-alpha-channel-png-seamless-gray-white-squares-vector-design-grid-checkered-267351012.jpg',
  })
  image: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ nullable: false })
  time: string;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: false })
  entry_fee: number;

  @Column({ nullable: false })
  details: string;

  @Column({ type: 'enum', enum: LeagueStatus, default: LeagueStatus.PENDING })
  status: LeagueStatus;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
