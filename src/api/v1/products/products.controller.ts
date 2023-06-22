import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductEntity } from './entities/products.entity';

@Controller('api/v1/products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async findAll() {
        return await this.productService.findAll();
    }

    @Post()
    async create(@Body() body: ProductEntity) {
        return await this.productService.create(body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.productService.delete(id);
    }
}
