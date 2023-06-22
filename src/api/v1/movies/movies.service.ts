import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {

    async findManyBy(search: string) {
        // const res = await this.httpClientService.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${search}&type=movie`);
        // if(res.Response !== 'True') {
        //     throw new HttpException(res.Error, HttpStatus.NOT_FOUND);
        // } 
        
        throw new HttpException("res.Error", HttpStatus.NOT_FOUND);
    }

    async findOneBy(id: string) {
        // const res = await this.httpClientService.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`);
        // if(res.Response !== 'True') {
        //     throw new HttpException(res.Error, HttpStatus.NOT_FOUND);
        // }
        throw new HttpException("res.Error", HttpStatus.NOT_FOUND);
    }
}
