import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { LeagueStatus } from 'src/common';
import { User } from 'src/modules/auth/entities/user.entity';

@Entity('league_admin')
export class LeagueAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: LeagueStatus, default: LeagueStatus.PENDING })
  status: LeagueStatus;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  leagueAdminDetails: User;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
