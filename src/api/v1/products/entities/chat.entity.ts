import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ProductEntity } from './products.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { MessageEntity } from './message.entity';
  
  @Entity('chats')
  export class ChatEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column()
    status: boolean;
  
    @ManyToOne(() => ProductEntity, (product) => product.chats)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;
    
    @ManyToOne(() => UserEntity, (user) => user.chats)
    @JoinColumn({ name: 'buyer_id' })
    buyer: UserEntity;

    @OneToMany(() => MessageEntity, (messages) => messages.chat, { nullable: true })
    messages: MessageEntity[];
    
  }
  