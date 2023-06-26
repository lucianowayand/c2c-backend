import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ProductEntity } from './products.entity';
  
  @Entity('photos')
  export class PhotoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @Column()
    photo_url: string;
  
    @ManyToOne(() => ProductEntity, (product) => product.photos)
    @JoinColumn({ name: 'product_id' }) // Specify the foreign key column name
    product: ProductEntity;
  }
  