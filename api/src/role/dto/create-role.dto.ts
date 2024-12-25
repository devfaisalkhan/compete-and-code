import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EPermission } from "src/shared/shared.model";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsArray()
  permissions: EPermission[];
}
