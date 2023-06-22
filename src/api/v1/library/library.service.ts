import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LibraryEntity } from './entities/library.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesEntity } from '../movies/entities/movies.entity';

@Injectable()
export class LibraryService {
    constructor(@InjectRepository(LibraryEntity) private readonly libraryRepository: Repository<LibraryEntity>, @InjectRepository(MoviesEntity) private readonly movieRepository: Repository<MoviesEntity>) {
        this.libraryRepository = libraryRepository;
        this.movieRepository = movieRepository;
    }

    async findByUserId(userId: number) {
        const library = await this.libraryRepository.find({
            relations: ['movie'],
            where: {
                user: {
                    id: userId
                }
            }
        });
        if (!library) {
            throw new HttpException('Movie list not found', HttpStatus.NOT_FOUND);
        }
        return library;
    }

    async getMovieById(userId: number, movieId: string) {
        let movie = await this.movieRepository.findOne({ where: { imdbID: movieId } });
        // if (!movie) {
        //     const res = await this.httpClientService.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`);
        //     if (res.Response !== 'True') {
        //         throw new HttpException(res.Error, HttpStatus.NOT_FOUND);
        //     }

        //     movie = new MoviesEntity()
        //     movie.title = res.Title;
        //     movie.poster = res.Poster;
        //     movie.year = res.Year;
        //     movie.imdbID = res.imdbID;
        //     movie.imdbRating = res.imdbRating;
        // }

        const library = await this.libraryRepository.findOne({
            where: {
                movie: {
                    imdbID: movieId
                },
                user: {
                    id: userId
                }
            }
        });
        const result = {
            movie: movie,
            inLibrary: library ? true : false,
        }

        return result;
    }

    async addReview(userId: number, movieId: string, review: string) {
        const library = await this.libraryRepository.findOne({
            where: {
                user: {
                    id: userId
                },
                movie: {
                    imdbID: movieId
                }
            }
        });
        if (!library) {
            throw new HttpException('Library entry not found', HttpStatus.NOT_FOUND);
        }

        library.review = review;
        await this.libraryRepository.save(library);
        return library;
    }

    async deleteFromLibrary(userId: number, movieId: string) {
        const library = await this.libraryRepository.findOne({
            where: {
                user: {
                    id: userId
                },
                movie: {
                    imdbID: movieId
                }
            }
        });
        if (!library) {
            throw new HttpException('Library entry not found', HttpStatus.NOT_FOUND);
        }
        await this.libraryRepository.delete({ id: library.id });
        return library;
    }

    async addToLibrary(userId: number, movieId: string) {
        if (movieId !== "") {
            let movie = await this.movieRepository.findOne({ where: { imdbID: movieId } });
            // if (!movie) {
            //     const res = await this.httpClientService.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`);
            //     if (res.Response !== 'True') {
            //         throw new HttpException(res.Error, HttpStatus.NOT_FOUND);
            //     }

            //     movie = new MoviesEntity()
            //     movie.title = res.Title;
            //     movie.poster = res.Poster;
            //     movie.year = res.Year;
            //     movie.imdbID = res.imdbID;
            //     movie.imdbRating = res.imdbRating;
            //     await this.movieRepository.save(movie);
            // }

            const newLibrary = new LibraryEntity();
            newLibrary.user = { ...newLibrary.user, id: userId };
            newLibrary.movie = movie;
            newLibrary.review = "";

            await this.libraryRepository.save(newLibrary);
            return newLibrary;
        } else {
            throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
        }
    }
}