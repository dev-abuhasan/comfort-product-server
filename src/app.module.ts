import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { Product } from './product/entities/product.entity';
import { Comment } from './comment/entities/comment.entity';
import { UploadModule } from './upload/upload.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '7266',
            database: 'comfort_product',
            entities: [Product, Comment],
            synchronize: true,
        }),
        ProductModule,
        CommentModule,
        UploadModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
