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
import { ChatEntity } from './chat.entity';
  
  @Entity('messages')
  export class MessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @ManyToOne(() => ChatEntity, (chat) => chat.messages)
    @JoinColumn({ name: 'chat_id' })
    chat: ChatEntity;

    @Column()
    text: string;

    @Column()
    sender_id: string;

  }
  