import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/products.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductEntity) private readonly productEntity: Repository<ProductEntity>) {
        this.productEntity = productEntity;
    }

    async findAll() {
        const products = await this.productEntity.find();
        if (!products) {
            throw new HttpException('Product list not found', HttpStatus.NOT_FOUND);
        }
        return products;
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