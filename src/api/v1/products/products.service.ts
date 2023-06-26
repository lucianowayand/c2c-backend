import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/products.entity';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productEntity: Repository<ProductEntity>, 
        @InjectRepository(ChatEntity) private readonly chatEntity: Repository<ChatEntity>) {
        this.chatEntity = chatEntity;
        this.productEntity = productEntity;
    }

    async startConversation(buyer_id: string, product_id: string) {
        try {
            const product = await this.productEntity.findOne({
                where: {
                    id: product_id
                }
            })
            if (!product) {
                throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            }
            // checks if the buyer already has a chat with the product
            const chatExists = await this.chatEntity.findOne({
                where: {
                    buyer: {
                        id: buyer_id
                    },
                    product: {
                        id: product_id
                    }
                }
            })
            if (chatExists) {
                throw new HttpException('Chat already exists', HttpStatus.BAD_REQUEST);
            }
            const chat = await this.chatEntity.save({
                buyer: {
                    id: buyer_id
                },
                product: {
                    id: product_id
                }
            })
            return chat;
        } catch (error) {
            throw new HttpException(`erro ao iniciar conversa: ${error.response}`, HttpStatus.BAD_REQUEST);
        }
    }

    async getChatsByProduct(product_id: string) {
        try {
            const chats = await this.chatEntity.find({
                where: {
                    product: {
                        id: product_id
                    }
                },
                relations: ['buyer']
            })
            if (!chats) {
                throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
            }
            return chats;
        } catch (error) {
            throw new HttpException(`erro ao buscar chats: ${error.sqlMessage}`, HttpStatus.BAD_REQUEST);
        }
    }

    async getChatsByBuyer(user_id: string) {
        try {
            const chats = await this.chatEntity.find({
                where: {
                    buyer: {
                        id: user_id
                    }
                },
                relations: ['product']
            })
            if (!chats) {
                throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
            }
            return chats;
        } catch (error) {
            throw new HttpException(`erro ao buscar chats: ${error.sqlMessage}`, HttpStatus.BAD_REQUEST);
        }
    }

    async getChatsByOwner(user_id: string) {
        try {
            const chats = await this.chatEntity.find({
                where: {
                    product: {
                        owner: {
                            id: user_id
                        }
                    }
                },
                relations: ['buyer', 'product']
            })
            if (!chats) {
                throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
            }
            return chats;
        } catch (error) {
            throw new HttpException(`erro ao buscar chats: ${error.sqlMessage}`, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll() {
        try {
            const products = await this.productEntity.find({
                relations: ['photos']
            })
            if (!products) {
                throw new HttpException('Product list not found', HttpStatus.NOT_FOUND);
            }
            return products;
        } catch (error) {
            throw new HttpException(`erro ao buscar produtos: ${error.sqlMessage}`, HttpStatus.BAD_REQUEST);
        }
    }

    async findByUser(userId: string) {
        try {
            const products = await this.productEntity.find({
                where: {
                    owner: {
                        id: userId
                    }
                },
                relations: ['photos']
            })
            if (!products) {
                throw new HttpException('Product list not found', HttpStatus.NOT_FOUND);
            }
            return products;
        } catch (error) {
            throw new HttpException(`erro ao buscar produtos: ${error.sqlMessage}`, HttpStatus.BAD_REQUEST);
        }
    }

    async create(product: ProductEntity){
        try {
            await this.productEntity.save(product);

        } catch(error) {
            throw new HttpException(`erro ao criar usuario: ${error.sqlMessage}`, HttpStatus.BAD_REQUEST);
        }
        return product;
    }

    async delete(productId: string){
        try {
            await this.productEntity.delete({id: productId});
        } catch(error) {
            throw new HttpException(`erro ao deletar usuario: ${error.sqlMessage}`, HttpStatus.BAD_REQUEST);
        }
        return {deleted: true};
    }
}