import { Product } from './../product/entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

describe('CommentController', () => {
    let controller: CommentController;
    let service: CommentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [
                {
                    provide: CommentService,
                    useValue: {
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CommentController>(CommentController);
        service = module.get<CommentService>(CommentService);
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
            product, // provide the product object for the product property
            ...createCommentDto,
        };

        it('should create a new comment', async () => {
            jest.spyOn(service, 'create').mockResolvedValue(comment);

            const result = await controller.create(createCommentDto);

            expect(service.create).toHaveBeenCalledWith(createCommentDto);
            expect(result).toEqual(comment);
        });
    });
});
