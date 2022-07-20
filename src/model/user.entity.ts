import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 300 })
    email: string;
   
    @Column({ type: 'varchar', length: 300, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 300 })
    hash: string;
}