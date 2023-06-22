import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CATEGORY } from 'src/utils';

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    category: CATEGORY;

    @Column()
    description: string;

    @Column('boolean', {default: true})
    status: boolean;

}