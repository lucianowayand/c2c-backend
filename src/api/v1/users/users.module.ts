import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IsAuthorizedMiddleware } from './users.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, JwtService],
  controllers: [UsersController]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAuthorizedMiddleware)
      .forRoutes({ path: '/api/v1/users/:id', method: RequestMethod.PATCH });
  }
}
