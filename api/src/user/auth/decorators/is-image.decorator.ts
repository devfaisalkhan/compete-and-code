import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

export const IsImage = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const file: Express.Multer.File = request.file; // Multer file is attached to 'file' key by default

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const mimeType = file.mimetype;
    console.log(mimeType);
    
    if (!mimeType || !mimeType.startsWith('image/')) {
      throw new BadRequestException('Uploaded file must be an image');
    }

    return file;
  },
);
