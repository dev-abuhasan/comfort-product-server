import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EntityNotFoundError } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    create(createProductDto: CreateProductDto) {
        return this.productRepository.save(createProductDto);
    }

    async findAll(): Promise<Product[]> {
        try {
            const products = await this.productRepository.find({
                relations: ['comments'],
            });
            return products;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                return [];
            }
            throw error;
        }
    }

    async findOne(id: number): Promise<Product> {
        try {
            const product = await this.productRepository.findOneOrFail({
                where: { id },
                relations: ['comments'],
            });
            return product;
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                return {} as Product;
            }
            throw error;
        }
    }
    async update(
        id: number,
        updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        Object.assign(product, updateProductDto);
        return await this.productRepository.save(product);
    }

    async remove(id: number) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        await this.commentRepository.delete({ productId: id });
        return this.productRepository.delete(id);
    }
}
