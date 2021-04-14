import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

// import * as csurf from 'csurf';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

export const bootstrapApp = async (expressApp?) => {
  const app = await NestFactory.create(
    AppModule,
    expressApp ? new ExpressAdapter(expressApp) : undefined,
  );

  app.enableCors();
  // app.use(csurf());
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .addServer('/dev')
    .addServer('/')
    .addBearerAuth()
    .setContact('Yousuf Khan', null, 'yusufkhanjee@gmail.com')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
};
