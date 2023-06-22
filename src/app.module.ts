import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './api/v1/movies/movies.controller';
import { MoviesService } from './api/v1/movies/movies.service';
import { MoviesModule } from './api/v1/movies/movies.module';
import { UsersModule } from './api/v1/users/users.module';
import { LibraryModule } from './api/v1/library/library.module';
import { ProductController } from './api/v1/products/products.controller';
import { ProductModule } from './api/v1/products/products.module';
import { ProductService } from './api/v1/products/products.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: true,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
  }), UsersModule, MoviesModule, LibraryModule, ProductModule],
  controllers: [AppController, MoviesController],
  providers: [AppService, MoviesService],
})
export class AppModule { }
