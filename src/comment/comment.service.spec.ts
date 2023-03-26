import { Product } from './../product/entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CommentController', () => {
    let controller: CommentController;
    let commentRepository: Repository<Comment>;
    let productRepository: Repository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [
                CommentService,
                {
                    provide: getRepositoryToken(Comment),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Product),
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<CommentController>(CommentController);

        commentRepository = module.get<Repository<Comment>>(
            getRepositoryToken(Comment),
        );
        productRepository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    describe('create', () => {
        const createCommentDto: CreateCommentDto = {
            productId: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            comment: 'This is a test comment',
        };

        const product: Product = {
            id: 1,
            category: 'electronics',
            subcategory: 'smartphones',
            brand: 'Samsung',
            description: 'Galaxy S21 Ultra 5G',
            price: 1099.99,
            featuredImage: 'https://example.com/s21ultra.jpg',
            images: [
                'https://example.com/s21ultra1.jpg',
                'https://example.com/s21ultra2.jpg',
                'https://example.com/s21ultra3.jpg',
            ],
            comments: [],
        };

        const comment: Comment = {
            id: 1,
            product,
            ...createCommentDto,
        };

        it('should create a new comment', async () => {
            const product: Product = {
                id: 1,
                category: 'electronics',
                subcategory: 'smartphones',
                brand: 'Samsung',
                description: 'Galaxy S21 Ultra 5G',
                price: 1099.99,
                featuredImage: 'https://example.com/s21ultra.jpg',
                images: [
                    'https://example.com/s21ultra1.jpg',
                    'https://example.com/s21ultra2.jpg',
                    'https://example.com/s21ultra3.jpg',
                ],
                comments: [],
            };

            jest.spyOn(productRepository, 'findOne').mockResolvedValue(product);
            jest.spyOn(commentRepository, 'save').mockResolvedValue(comment);

            const result = await controller.create(createCommentDto);

            expect(productRepository.findOne).toHaveBeenCalledWith(
                createCommentDto.productId,
            );
            expect(commentRepository.save).toHaveBeenCalledWith({
                ...createCommentDto,
                product,
            });
            expect(result).toEqual(comment);
        });
    });
});
