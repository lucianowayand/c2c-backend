import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ChatEntity } from '../../products/entities/chat.entity';
import { ProductEntity } from '../../products/entities/products.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    full_name: string;

    @Column()
    state: string;
    
    @Column()
    city: string;
    
    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @OneToMany(type => ProductEntity, product => product.owner)
    products: ProductEntity[];

    @OneToMany(type => ChatEntity, chat => chat.buyer)
    chats: ChatEntity[];
}