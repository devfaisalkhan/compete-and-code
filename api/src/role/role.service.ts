import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/shared/shared.model';
import { UUID } from 'crypto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {
    
  }

  async create(createRoleDto: CreateRoleDto): Promise<IResponse<any>> {
   const role = await this.roleRepo.create(createRoleDto); 

   await this.roleRepo.save(role);
   
   return {
    message: 'Role created successfully',
    status: HttpStatus.OK
   }
  }

  countAll() {
    return this.roleRepo.count();
  }

  findAndCount() {
    return this.roleRepo.findAndCount();
  }

  async getAllRoles(): Promise<IResponse<any>> {
    const roles = await this.roleRepo.find();
    
    if(!roles) {
      throw new NotFoundException('Roles not found');
    }

    return {
      data: roles,
      status: HttpStatus.OK
    };
  }

  getRoleById(id: UUID) {
    const role = this.roleRepo.findOne({where: {id: id}});
    if(!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(updateRoleDto: any): Promise<IResponse<any>> {
    const role = await this.roleRepo.findOne({where: {id: updateRoleDto.id}});

    if(!role) {
      throw new NotFoundException('Role not found');
    }

   await this.roleRepo.update(updateRoleDto.id, updateRoleDto);

    return {  
      message: 'Role updated successfully',
      status: HttpStatus.OK
    }
  }

  async remove(id: UUID): Promise<IResponse<any>> {
    const role = await this.roleRepo.findOne({where: {id: id}});

    if(!role) {
      throw new NotFoundException('Role not found');
    }

   await this.roleRepo.delete(role);

    return {  
      message: 'Role deleted successfully',
      status: HttpStatus.OK
    }
  }
}
