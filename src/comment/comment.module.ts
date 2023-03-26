import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Product } from 'src/product/entities/product.entity';
import { Comment } from './entities/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Comment])],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}
