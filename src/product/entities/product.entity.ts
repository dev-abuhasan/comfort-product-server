import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @Column()
    subcategory: string;

    @Column()
    brand: string;

    @Column({ length: 5000 })
    description: string;

    @Column()
    price: number;

    @Column()
    featuredImage: string;

    @Column('simple-array')
    images: string[];

    @OneToMany(() => Comment, (comment) => comment.product)
    comments: Comment[];
}
