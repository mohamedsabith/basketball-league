import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('court')
export class Court {
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

  @Column('simple-array', { nullable: true, default: [] })
  image_thumb: string[];

  @Column({ nullable: false, type: 'decimal' })
  longitude: number;

  @Column({ nullable: false, type: 'decimal' })
  latitude: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: true })
  zipcode: number;

  @CreateDateColumn({ name: 'createdate' })
  createdate: Date;

  @UpdateDateColumn({ name: 'updateddate' })
  updateddate: Date;
}
