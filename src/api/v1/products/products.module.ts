import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/products.entity';
import { JwtService } from '@nestjs/jwt';
import { IsAuthorizedMiddleware } from '../users/users.middleware';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { PhotoEntity } from './entities/photo.entity';
import { ChatEntity } from './entities/chat.entity';
import { MessageEntity } from './entities/message.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity,PhotoEntity,ChatEntity,MessageEntity])],
    providers: [ProductService, JwtService],
    controllers: [ProductController]
  })
  export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(IsAuthorizedMiddleware).forRoutes(ProductController);
    }
  }
  