import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: multer.diskStorage({
          destination: configService.get<string>('FILES_DESTINATION'),
          filename: (req, file, callBack) => {
            try {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              const ext = extname(file.originalname);
              callBack(null, `${uniqueSuffix}${ext}`);
            } catch (error) {
              callBack(new HttpException('Failed to generate filename', HttpStatus.INTERNAL_SERVER_ERROR), file.originalname);
            }
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
