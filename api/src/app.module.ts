import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { SeedDataMiddleware } from './shared/middleware/seed-data.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { CoursesModule } from './courses/courses.module';
import appConfig from './config/app.config';
import { JwtModule } from '@nestjs/jwt';
import { AppConstant } from './shared/app.constant';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
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
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    UserModule,
    AuthModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    JwtStrategy
  ],
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(SeedDataMiddleware).forRoutes('/');
  }
}
