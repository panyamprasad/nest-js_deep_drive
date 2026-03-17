import { Profile } from 'src/profile/profile.entity';
import { Tweet } from 'src/tweet/tweet.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 24, nullable: true })
  username: string | undefined;

  @Column({ type: 'varchar', length: 150, unique: true })
  email: string | undefined;

  @Column()
  password?: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  profile?: Profile;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweet: Tweet[];

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;

  @DeleteDateColumn()
  deletedAt: Date | undefined;
}
