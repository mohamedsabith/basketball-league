import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import { Player } from '../../player/entities/player.entity';
import { LeagueAdmin } from 'src/modules/league-admin/entities/league-admin.entity';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Gender, UserRole } from 'src/common';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  username: string;

  @Index({ unique: true })
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  last_login?: Date;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  public refresh_token?: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.PREFER_NOT_TO_SAY,
  })
  gender: Gender;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PLAYER,
  })
  role: UserRole;

  @OneToOne(() => Player, (player) => player.playerDetails, {
    eager: true,
    cascade: true,
  })
  playerDetails: Player;

  @OneToOne(
    () => LeagueAdmin,
    (leagueAdmin) => leagueAdmin.leagueAdminDetails,
    {
      eager: true,
      cascade: true,
    },
  )
  leagueAdminDetails: LeagueAdmin;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
