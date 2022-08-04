import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'nps' })
export class NetPromoterScore {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300 })
    score: number;

    @Column({ type: 'varchar', length: 300 })
    label: string;
    
    @ManyToOne(() => User, users => User, {eager: true})
    user: User
    
    @ManyToOne(() => Product, products => Product, {eager: true})
    product: Product
}