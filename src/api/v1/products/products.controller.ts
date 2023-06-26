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

    @Get('/user/:userId')
    async findByUser(@Param('userId') userId: string) {
        return await this.productService.findByUser(userId);
    }

    @Post('/:product_id/chat/:buyer_id')
    async startConversation(@Param('buyer_id') buyer_id: string, @Param('product_id') product_id: string) {
        return await this.productService.startConversation(buyer_id, product_id);
    }

    @Get('/:product_id/chat/')
    async getChatsByProduct(@Param('product_id') product_id: string) {
        return await this.productService.getChatsByProduct(product_id);
    }

    @Get('/chat/buyer/:buyer_id')
    async getChatsByBuyer(@Param('buyer_id') buyer_id: string) {
        return await this.productService.getChatsByBuyer(buyer_id);
    }

    @Get('/chat/owner/:owner_id')
    async getChatsByOwner(@Param('owner_id') buyer_id: string) {
        return await this.productService.getChatsByOwner(buyer_id);
    }

    @Post('/chat/:chat_id/message')
    async sendMessage(@Param('chat_id') chat_id: string, @Body() body: {message: string, sender: string}) {
        return await this.productService.sendMessage(chat_id, body);
    }

    @Get('/chat/:chat_id/message')
    async getMessages(@Param('chat_id') chat_id: string) {
        return await this.productService.getMessages(chat_id);
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
