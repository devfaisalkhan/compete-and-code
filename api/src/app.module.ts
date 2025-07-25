import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { SeedDataMiddleware } from './shared/middleware/seed-data.middleware';
import { CoursesModule } from './courses/courses.module';
import appConfig from './shared/config/app.config';
import { AuthModule } from './user/auth/auth.module';
import { JwtStrategy } from './user/auth/strategies/jwt.strategy';
import { RoleModule } from './role/role.module';
import { OtpModule } from './user/otp/otp.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const CONNECTION_NAME = 'default';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: CONNECTION_NAME,
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_LOCATION'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          auth: {
            user: configService.get<string>('EMAIL_USERNAME'),
            pass: configService.get<string>('EMAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '_uploads'), // Point to the uploads directory
      serveRoot: '/uploads', // Serve files under the /uploads path
    }),
    UserModule,
    AuthModule,
    CoursesModule,
    RoleModule,
    OtpModule,
    FileUploadModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy
  ],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedDataMiddleware).forRoutes('/');
  }
}
