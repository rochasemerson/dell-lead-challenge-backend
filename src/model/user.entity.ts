import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { NetPromoterScore } from './nps.entity';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300 })
    email: string;
   
    @Column({ type: 'varchar', length: 300 })
    name: string;

    @Column({ type: 'varchar', length: 300 })
    hash: string;

    @OneToMany(() => NetPromoterScore, user => User)
    nps: NetPromoterScore[]
}