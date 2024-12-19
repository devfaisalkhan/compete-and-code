import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Inject, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConstant } from './shared/app.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSvc = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({forbidNonWhitelisted: true}));
  app.enableCors();
  app.setGlobalPrefix(AppConstant.ROUTE_PREFIX);

  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(configSvc.get<string>('LOCAL_PORT'));
  console.log(`app running on ${configSvc.get<string>('LOCAL_PORT')}`)
}
bootstrap();
