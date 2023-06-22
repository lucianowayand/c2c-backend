import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { LibraryEntity } from "../../library/entities/library.entity";

@Entity('movies')
export class MoviesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    title: string;

    @Column()
    poster: string;

    @Column()
    year: string;

    @Column()
    imdbID: string;

    @Column()
    imdbRating: string;

    @OneToMany(type => LibraryEntity, library => library.user)
    library: LibraryEntity[];
}
