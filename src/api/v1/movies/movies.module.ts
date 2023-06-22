import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
    imports: [],
    providers: [MoviesService],
    controllers: [MoviesController],
})
export class MoviesModule { }
