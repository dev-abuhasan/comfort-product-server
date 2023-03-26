import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Comfort Product')
        .setDescription('The Comfort Product API description')
        .setVersion('1.0')
        .addTag('Comfort Product')
        .addServer('/api/v1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.setGlobalPrefix('/api/v1');
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    await app.listen(8080);
};

bootstrap();
