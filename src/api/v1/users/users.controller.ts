import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { LoginPayload, UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Controller('/api/v1/users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}

    @Get(':user_id')
    get(@Param('user_id') id: string) {
        return this.usersService.findOne(id);
    }
    
    @Post()
    create(@Body() user: UserEntity) {
        return this.usersService.create(user);
    }

    @Post('login')
    login(@Body() body: LoginPayload) {
        return this.usersService.login(body);
    }

    @Delete(':user_id')
    delete(@Param('user_id') id: number) {
        return this.usersService.delete(id);
    }

    @Patch(':user_id')
    update(@Param('user_id') id: string, @Body() user: UserEntity) {
        return this.usersService.update(id, user);
    }
}
