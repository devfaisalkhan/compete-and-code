import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';
import { EPermission } from 'src/shared/shared.model';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(EPermission, { each: true })
  permissions?: EPermission[];
}
