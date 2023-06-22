import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface LoginPayload {
    email: string;
    password: string;
}

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService) {
        this.userRepository = userRepository;
    }

    async login(body: LoginPayload) {
        const user = await this.userRepository.findOne({
            where: {
                email: body.email
            }
        });
        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (!await bcrypt.compare(body.password, user.password)) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const token = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            full_name: user.full_name,
        }, { secret: process.env.SECRET });

        return token
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            },
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async create(user: UserEntity) {
        try {
            const hash = await bcrypt.hash(user.password, 8);
            user.password = hash;
            const savedUser = await this.userRepository.save(user);
            return { message: 'User created successfully' }
        } catch (error) {
            throw new HttpException(`Couldn't create user: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async update(id: number, user: UserEntity) {
        try {
            await this.userRepository.update(id, user);
        } catch (error) {
            throw new HttpException(`Couldn't update user: ${error}`, HttpStatus.BAD_REQUEST);
        }

        return this.findOne(id);
    }

    async delete(id: number) {
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            throw new HttpException(`Couldn't delete user: ${error}`, HttpStatus.BAD_REQUEST);
        }

        return { message: 'User deleted successfully' };
    }
}
