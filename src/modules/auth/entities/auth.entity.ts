import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  last_login?: Date;

  @Column('varchar', { nullable: true })
  hach_refresh_token: string;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
