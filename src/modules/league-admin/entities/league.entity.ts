import { User } from 'src/modules/auth/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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

  @ManyToMany(() => User, { eager: true, cascade: true })
  @JoinTable()
  requestedUsers: User[];

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
