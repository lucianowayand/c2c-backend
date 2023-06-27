import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductEntity } from './entities/products.entity';
import { CATEGORY } from 'src/utils';

@Controller('api/v1/products')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async findAll(
        @Query('name') name: string, 
        @Query('category') category: CATEGORY, 
        @Query('order_price') order_price: "DESC" | "ASC",
        @Query('city') city: string,
        @Query('state') state: string,
    ) {
        return await this.productService.findAll(name, category, order_price, city, state);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.productService.findById(id);
    }

    @Get('/owner/:owner_id')
    async findByUser(@Param('owner_id') userId: string) {
        return await this.productService.findByUser(userId);
    }

    @Post('/:product_id/chat/:user_id')
    async startConversation(@Param('user_id') buyer_id: string, @Param('product_id') product_id: string) {
        return await this.productService.startConversation(buyer_id, product_id);
    }

    @Get('/chat/buyer/:user_id')
    async getChatsByBuyer(@Param('user_id') buyer_id: string) {
        return await this.productService.getChatsByBuyer(buyer_id);
    }

    @Get('/chat/owner/:user_id')
    async getChatsByOwner(@Param('user_id') owner_id: string) {
        return await this.productService.getChatsByOwner(owner_id);
    }

    @Post('user/:user_id/chat/:chat_id/message')
    async sendMessage(@Param('chat_id') chat_id: string, @Body() body: {message: string}, @Param('user_id') user_id: string) {
        return await this.productService.sendMessage(chat_id, {message: body.message, sender: user_id});
    }

    // Qualquer usuário logado pode ler as mensagens de um chat -- Perigo!
    @Get('/chat/:chat_id/message')
    async getMessages(@Param('chat_id') chat_id: string) {
        return await this.productService.getMessages(chat_id);
    }

    @Post('/owner/:user_id')
    async create(@Param('user_id') user_id: string, @Body() body: ProductEntity) {
        const product = {...body, owner: {...body.owner, id: user_id}};
        return await this.productService.create(product);
    }

    @Delete(':id/owner/:user_id')
    async delete(@Param('id') id: string) {
        return await this.productService.delete(id);
    }

    @Patch(':id/owner/:user_id')
    async update(@Param('id') id: string, @Body() body: ProductEntity, @Param('user_id') user_id: string) {
        return await this.productService.update(id, body, user_id);
    }

}
