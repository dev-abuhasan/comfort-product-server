import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    subcategory: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    brand: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsPositive()
    price: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    featuredImage: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ each: true })
    images: string[];
}
