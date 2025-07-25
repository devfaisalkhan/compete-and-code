import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Req } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Allow } from 'class-validator';
import { Public } from 'src/user/auth/decorators/public.decorator';
import { CurrentUser } from 'src/user/auth/decorators/user.decorator';
import { IsImage } from 'src/user/auth/decorators/is-image.decorator';

@Controller('file-upload')
@Public()
export class FileUploadController {
  constructor(private readonly fileUploadSvc: FileUploadService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
  //   const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
  //   return this.fileUploadSvc.handleFileUpload(fileUrl);
  // }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@IsImage() file: Express.Multer.File, @Req() req: any) {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    return this.fileUploadSvc.handleFileUpload(fileUrl);
  }

  
  @Post()
  create(@Body() createFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadSvc.create(createFileUploadDto);
  }

  @Get()
  findAll() {
    return this.fileUploadSvc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadSvc.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileUploadDto: UpdateFileUploadDto) {
    return this.fileUploadSvc.update(+id, updateFileUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadSvc.remove(+id);
  }
}
