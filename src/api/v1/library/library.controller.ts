import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('api/v1/library')
export class LibraryController {
    constructor(private libraryService: LibraryService) { }

    
    @Get('user/:userId/movie/:movieId')
    async getMovieById(@Param('userId') userId: number, @Param('movieId') movieId: string) {
        const library = await this.libraryService.getMovieById(userId, movieId);
        return library;
    }
    
    @Get('user/:userId')
    async findByUserId(@Param('userId') userId: number) {
        const library = await this.libraryService.findByUserId(userId);
        return library;
    }

    @Post('user/:userId/movie/:movieId')
    async addToLibrary(@Param('userId') userId: number, @Param('movieId') movieId: string) {
        const library = await this.libraryService.addToLibrary(userId, movieId);
        return library;
    }

    @Patch('user/:userId/movie/:movieId')
    async addReview(@Param('userId') userId: number, @Param('movieId') movieId: string, @Body('review') review: string) {
        const library = await this.libraryService.addReview(userId, movieId, review);
        return library;
    }

    @Delete('user/:userId/movie/:movieId')
    async deleteFromLibrary(@Param('userId') userId: number, @Param('movieId') movieId: string) {
        const library = await this.libraryService.deleteFromLibrary(userId, movieId);
        return library;
    }
}
