import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import * as csurf from 'csurf';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.use(csurf());
  app.use(helmet());

  const config = new DocumentBuilder()
    .setContact('Yousuf Khan', null, 'yusufkhanjee@gmail.com')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
