import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { LibraryEntity } from '../../library/entities/library.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    full_name: string;
    
    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @OneToMany(type => LibraryEntity, library => library.user)
    library: LibraryEntity[];
}