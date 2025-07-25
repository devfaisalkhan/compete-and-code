import { IsNotEmpty, IsOptional } from "class-validator";
import { IsImage } from "src/user/auth/decorators/is-image.decorator";

export class CreateFileUploadDto {
    @IsOptional() 
    file: Express.Multer.File;
}
