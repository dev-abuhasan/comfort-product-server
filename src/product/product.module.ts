import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Comment])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
