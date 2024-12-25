import { IsNotEmpty, IsString, IsEmail, IsOptional, IsBoolean } from "class-validator";
import { IRole } from "../user.model";
import { Role } from "src/role/entities/role.entity";

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsOptional()
  roles?: Role[]; 

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive?: boolean;
}



