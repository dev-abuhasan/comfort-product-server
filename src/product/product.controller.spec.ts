import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';

describe('ProductController', () => {
    let controller: ProductController;
    let productService: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        productService = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call productService.create with the correct arguments', async () => {
            const createProductDto: CreateProductDto = {
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
            };
            const expectedProduct: Product = {
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

            jest.spyOn(productService, 'create').mockResolvedValue(
                expectedProduct,
            );

            const result = await controller.create(createProductDto);

            expect(productService.create).toHaveBeenCalledWith(
                createProductDto,
            );
            expect(result).toBe(expectedProduct);
        });
    });

    describe('findAll', () => {
        it('should call productService.findAll', async () => {
            const expectedProducts: Product[] = [
                /* ... */
            ];

            jest.spyOn(productService, 'findAll').mockResolvedValue(
                expectedProducts,
            );

            const result = await controller.findAll();

            expect(productService.findAll).toHaveBeenCalled();
            expect(result).toBe(expectedProducts);
        });
    });

    describe('findOne', () => {
        it('should call productService.findOne with the correct argument', async () => {
            const id = 123;
            const expectedProduct: Product = {
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
            jest.spyOn(productService, 'findOne').mockResolvedValue(
                expectedProduct,
            );

            const result = await controller.findOne(id);

            expect(productService.findOne).toHaveBeenCalledWith(id);
            expect(result).toBe(expectedProduct);
        });
    });

    describe('update', () => {
        it('should call productService.update with the correct arguments', async () => {
            const id = 123;
            const updateProductDto: UpdateProductDto = {
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
            };
            const expectedProduct: Product = {
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

            jest.spyOn(productService, 'update').mockResolvedValue(
                expectedProduct,
            );

            const result = await controller.update(id, updateProductDto);

            expect(productService.update).toHaveBeenCalledWith(
                id,
                updateProductDto,
            );
            expect(result).toBe(expectedProduct);
        });
    });

    describe('remove', () => {
        it('should call productService.remove with the correct argument', async () => {
            const id = '123';

            jest.spyOn(productService, 'remove').mockResolvedValue(undefined);

            const result = await controller.remove(id);

            expect(productService.remove).toHaveBeenCalledWith(
                parseInt(id, 10),
            );
            expect(result).toBe(undefined);
        });
    });
});
