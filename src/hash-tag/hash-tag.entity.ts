import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hash_tag')
export class HashTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false, unique: true })
    name: string;
}