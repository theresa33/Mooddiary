import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Example')
  .setDescription('The mooddiary API description')
  .setVersion('1.0')
  .addTag('')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('swagger', app, document);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:8100',
    credentials: true
  });

  await app.listen(3000).then((data) => {
    console.log('Backend running on port 3000');
  });
}
bootstrap();
