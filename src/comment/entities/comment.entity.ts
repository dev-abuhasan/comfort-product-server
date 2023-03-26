import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    comment: string;

    @ManyToOne(() => Product, (product) => product.comments)
    product: Product;
}
