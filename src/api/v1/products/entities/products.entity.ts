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
  import { CATEGORY } from 'src/utils';
  import { PhotoEntity } from './photo.entity';
import { ChatEntity } from './chat.entity';
import { UserEntity } from '../../users/entities/user.entity';
  
  @Entity('products')
  export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
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
  
    @Column('boolean', { default: true })
    status: boolean;
  
    @ManyToOne(() => UserEntity, (user) => user.products, { nullable: false })
    @JoinColumn({ name: 'owner_id' })
    owner: UserEntity;

    @OneToMany(() => PhotoEntity, (photo) => photo.product, { nullable: true })
    photos: PhotoEntity[];

    @OneToMany(() => ChatEntity, (chats) => chats.product, { nullable: true })
    chats: ChatEntity[];
  }
  