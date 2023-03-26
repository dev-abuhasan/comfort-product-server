import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {
        cloudinary.config({
            cloud_name: 'dydkdsasz',
            api_key: '474761617967121',
            api_secret: 'wTiwqVG-L8tcmDYlQCy8ivLIdWM',
        });
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('featuredImage', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = 'img';
                    const extension = extname(file.originalname);
                    cb(null, `${randomName}${extension}`);
                },
            }),
        }),
    )
    async create(@UploadedFile() featuredImage: Express.Multer.File) {
        const result = await cloudinary.uploader.upload(featuredImage.path, {
            folder: '/comfort-product',
        });
        return result;
    }
}
