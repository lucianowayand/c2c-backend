import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { And, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/products.entity';
import { ChatEntity } from './entities/chat.entity';
import { MessageEntity } from './entities/message.entity';
import * as bcrypt from 'bcrypt';
import { PhotoEntity } from './entities/photo.entity';
import { CATEGORY } from 'src/utils';
@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productEntity: Repository<ProductEntity>, 
        @InjectRepository(ChatEntity) private readonly chatEntity: Repository<ChatEntity>,
        @InjectRepository(PhotoEntity) private readonly photoEntity: Repository<PhotoEntity>,
        @InjectRepository(MessageEntity) private readonly messageEntity: Repository<MessageEntity>) {
            this.messageEntity = messageEntity;
            this.chatEntity = chatEntity;
            this.photoEntity = photoEntity;
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
            throw new HttpException(`erro ao iniciar conversa: ${error}`, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(`erro ao buscar chats: ${error}`, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(`erro ao buscar chats: ${error}`, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(`erro ao buscar chats: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async sendMessage(chat_id: string, { message, sender}: { message: string, sender: string }) {
        try {
            const chat = await this.chatEntity.findOne({
                where: {
                    id: chat_id
                }
            })
            if (!chat) {
                throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
            }

            const newMessage = await this.messageEntity.save({
                chat: {
                    id: chat_id
                },
                text: message,
                sender_id: sender
            })
            return newMessage;

        } catch (error) {
            throw new HttpException(`erro ao enviar mensagem: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async getMessages(chat_id: string) {
        try {
            const messages = await this.messageEntity.find({
                where: {
                    chat: {
                        id: chat_id
                    }
                },
                order: {
                    createdAt: 'DESC'
                }
            })
            if (!messages) {
                throw new HttpException('Messages not found', HttpStatus.NOT_FOUND);
            }
            return messages;
        } catch (error) {
            throw new HttpException(`erro ao buscar mensagens: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(name?: string, category?: CATEGORY, order_price?: "DESC" | "ASC", city?: string, state?:string) {
        console.log({
            name,
            category,
            order_price,
            city,
            state
        })
        try {
            const products = await this.productEntity.find({
                where:{
                    name: name? Like(`%${name}%`) : undefined, 
                    category: category ? category : undefined,
                    owner: {
                        city: city ? Like(`%${city}%`) : undefined,
                        state: state? Like(`%${state}%`) : undefined,
                    },
                },
                order:{
                    value: order_price ? order_price : undefined
                },
                relations: ['photos', 'owner']
            })
            if (!products) {
                throw new HttpException('Product list not found', HttpStatus.NOT_FOUND);
            }
            return products;
        } catch (error) {
            throw new HttpException(`erro ao buscar produtos: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(id: string) {
        try {
            const product = await this.productEntity.findOne({
                where: {
                    id: id
                },
                relations: ['photos', 'owner']
            })
            if (!product) {
                throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            }
            return product;
        } catch (error) {
            throw new HttpException(`erro ao buscar produto: ${error}`, HttpStatus.BAD_REQUEST);
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
            throw new HttpException(`erro ao buscar produtos: ${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async create(product: ProductEntity){
        try {
            if(!CATEGORY[product.category]) {
                throw new HttpException('Categoria inválida', HttpStatus.BAD_REQUEST);
            }
            if(product.photos.length > 0) {
                const photos = await this.photoEntity.save(product.photos);
                product.photos = photos;
            }
            await this.productEntity.save(product);

        } catch(error) {
            throw new HttpException(`erro ao criar produto: ${error}`, HttpStatus.BAD_REQUEST);
        }
        return product;
    }

    async update(productId: string, product: ProductEntity, user_id:string){
        try {
            const productExists = await this.productEntity.findOne({
                where: {
                    id: productId,
                    owner: {
                        id: user_id
                    },
                }
            }) 
            if (!productExists) {
                throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            }
            if(!CATEGORY[product.category]) {
                throw new HttpException('Categoria inválida', HttpStatus.BAD_REQUEST);
            }
            if(product.photos.length > 0) {
                const photos = await this.photoEntity.save(product.photos);
                product.photos = photos;
            }
            await this.productEntity.update({id: productId}, product);
        } catch(error) {
            throw new HttpException(`erro ao atualizar produto: ${error}`, HttpStatus.BAD_REQUEST);
        }
        return product;
    }

    async delete(productId: string){
        try {
            const product = await this.productEntity.findOne({
                where: {
                    id: productId
                }
            })
            if (!product) {
                throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            }
            await this.photoEntity.update({product: {id: productId}}, {deletedAt: new Date()});
            await this.chatEntity.update({product: {id: productId}}, {status: false});
            await this.productEntity.update({id: productId}, {deletedAt: new Date()});

        } catch(error) {
            throw new HttpException(`erro ao deletar produto: ${error}`, HttpStatus.BAD_REQUEST);
        }
        return {deleted: true};
    }
}