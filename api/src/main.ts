import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Inject, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConstant } from './shared/app.constant';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configSvc = app.get(ConfigService);
  
  app.useGlobalPipes(new ValidationPipe({forbidNonWhitelisted: true}));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  app.enableCors();
  app.setGlobalPrefix(AppConstant.ROUTE_PREFIX);  

  const config = new DocumentBuilder()
  .setTitle('Compete-And-Code')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const uploadDir = join(process.cwd(), '_uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  await app.listen(configSvc.get<string>('LOCAL_PORT'));
  console.log(`app running on ${configSvc.get<string>('LOCAL_PORT')}`)
}
bootstrap();
