import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

const mockProduct = new Product();
mockProduct.id = 1;
mockProduct.category = 'test';
mockProduct.subcategory = 'test';
mockProduct.brand = 'test';
mockProduct.description = 'test';
mockProduct.price = 10;
mockProduct.featuredImage = 'test';
mockProduct.images = ['test1', 'test2'];
mockProduct.comments = [];

const mockProductRepository = {
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOneOrFail: jest.fn().mockResolvedValue(mockProduct),
};

describe('ProductService', () => {
    let productService: ProductService;
    let productRepository: Repository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockProductRepository,
                },
            ],
        }).compile();

        productService = module.get<ProductService>(ProductService);
        productRepository = module.get<Repository<Product>>(
            getRepositoryToken(Product),
        );
    });

    describe('create', () => {
        it('should save a product to the database', async () => {
            const createProductDto: CreateProductDto = {
                category: 'test category',
                subcategory: 'test subcategory',
                brand: 'test brand',
                description: 'test description',
                price: 100,
                featuredImage: 'test image url',
                images: ['test image url'],
            };

            const mockProduct: Product = {
                id: 1,
                ...createProductDto,
                comments: [],
            };

            productRepository.save = jest.fn().mockResolvedValue(mockProduct);

            const result = await productService.create(createProductDto);

            expect(productRepository.save).toHaveBeenCalledWith(
                createProductDto,
            );
            expect(result).toEqual(mockProduct);
        });
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            const products = await productService.findAll();

            expect(products).toEqual([mockProduct]);
            expect(productRepository.find).toHaveBeenCalledTimes(1);
        });

        it('should return an empty array if no products are found', async () => {
            jest.spyOn(productRepository, 'find').mockResolvedValueOnce([]);
            const products = await productService.findAll();

            expect(products).toEqual([]);
            expect(productRepository.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it('should return a product with the specified id', async () => {
            const id = 1;
            const product = await productService.findOne(id);

            expect(product).toEqual(mockProduct);
            expect(productRepository.findOneOrFail).toHaveBeenCalledWith(id, {
                relations: ['comments'],
            });
        });

        it('should return an empty product if the specified id is not found', async () => {
            const id = 999;
            jest.spyOn(
                productRepository,
                'findOneOrFail',
            ).mockRejectedValueOnce({
                name: 'EntityNotFoundError',
            });
            const product = await productService.findOne(id);

            expect(product).toEqual({} as Product);
            expect(productRepository.findOneOrFail).toHaveBeenCalledWith(id, {
                relations: ['comments'],
            });
        });
    });

    describe('update', () => {
        it('should update a product in the database', async () => {
            const id = 1;
            const updateProductDto: UpdateProductDto = {
                category: 'example category',
                subcategory: 'example subcategory',
                brand: 'example brand',
                description: 'example description',
                price: 99.99,
                featuredImage: 'example image',
                images: ['example image 1', 'example image 2'],
            };

            const mockProduct: Product = {
                id,
                category: 'test category',
                subcategory: 'test subcategory',
                brand: updateProductDto.brand,
                description: updateProductDto.description,
                price: updateProductDto.price,
                featuredImage: updateProductDto.featuredImage,
                images: updateProductDto.images,
                comments: [],
            };

            productRepository.findOne = jest
                .fn()
                .mockResolvedValue(mockProduct);
            productRepository.save = jest.fn().mockResolvedValue(mockProduct);

            const result = await productService.update(id, updateProductDto);

            expect(productRepository.findOne).toHaveBeenCalledWith({
                where: { id },
            });
            expect(productRepository.save).toHaveBeenCalledWith(mockProduct);
            expect(result).toEqual(mockProduct);
        });

        it('should throw a NotFoundException if the product is not found', async () => {
            const id = 1;
            const updateProductDto: UpdateProductDto = {
                category: 'example category',
                subcategory: 'example subcategory',
                brand: 'example brand',
                description: 'example description',
                price: 99.99,
                featuredImage: 'example image',
                images: ['example image 1', 'example image 2'],
            };

            productRepository.findOne = jest.fn().mockResolvedValue(undefined);

            await expect(
                productService.update(id, updateProductDto),
            ).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a product from the database', async () => {
            const id = 1;

            productRepository.findOne = jest.fn().mockResolvedValue({
                id,
                category: 'test category',
                subcategory: 'test subcategory',
                brand: 'test brand',
                description: 'test description',
                price: 100,
                featuredImage: 'test image url',
                images: ['test image url'],
                comments: [],
            });
            productRepository.delete = jest.fn().mockResolvedValue({});

            await productService.remove(id);

            expect(productRepository.findOne).toHaveBeenCalledWith({
                where: { id },
            });
            expect(productRepository.delete).toHaveBeenCalledWith(id);
        });

        it('should throw a NotFoundException if the product is not found', async () => {
            const id = 1;

            productRepository.findOne = jest.fn().mockResolvedValue(undefined);

            await expect(productService.remove(id)).rejects.toThrow(
                NotFoundException,
            );
        });
    });
});
