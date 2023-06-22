import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MoviesEntity } from '../../movies/entities/movies.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('library')
export class LibraryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(type => UserEntity, user => user.library)
    user: UserEntity;

    @ManyToOne(type => MoviesEntity, movie => movie.library)
    movie: MoviesEntity;

    @Column()
    review: string;

}