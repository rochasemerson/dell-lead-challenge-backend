import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { NetPromoterScore } from './nps.entity';

@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300 })
    name: string;
   
    @Column({ type: 'varchar', length: 10 })
    price: number;

    @Column({ type: 'varchar', length: 300 })
    description: string;
    
    @Column({ type: 'varchar', length: 300 })
    imgUrl: string;

    @OneToMany(() => NetPromoterScore, product => Product)
    nps: NetPromoterScore[]
}