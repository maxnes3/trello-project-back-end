import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.URL_FRONTEND],
    credentials: true,
    exposedHeaders: 'set-cookie'
  });

  const config = new DocumentBuilder()
    .setTitle('Trello-Project')
    .setDescription(
      'The project used: Nest.js, PostgreSQL, JWT Authorization, REST API, Validation pipe, Guards and Swagger. ER Diagram: https://dbdiagram.io/d/TrelloProject_ER_Diagram-66cb79b63f611e76e96d1b2b'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.URL_PORT);
}
bootstrap();
