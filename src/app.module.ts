import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/v1/users/users.module';
import { ProductModule } from './api/v1/products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: false,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
  }), UsersModule, ProductModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
