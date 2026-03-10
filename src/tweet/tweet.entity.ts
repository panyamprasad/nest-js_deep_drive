import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tweets')
export class Tweet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    text: string;

    @Column({ type: 'text', nullable: true })
    image?: string;

    @Column()
    createdAt?: Date;

    @Column()
    updatedAt?: Date;

    @ManyToOne(() => User, (user) => user.tweet, { eager: true })
    user: User;
}
