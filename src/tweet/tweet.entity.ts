import { Hash } from 'crypto';
import { HashTag } from 'src/hash-tag/hash-tag.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tweets')
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  text: string;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @CreateDateColumn()
  createdAt: Date | undefined;

  @UpdateDateColumn()
  updatedAt: Date | undefined;

  @ManyToOne(() => User, (user) => user.tweet)
  user: User;

  @ManyToMany(() => HashTag)
  @JoinTable()
  hashTag: HashTag[];
}
