import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/shared/shared.model';
import { UUID } from 'crypto';
import { IRole } from 'src/user/user.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {
    
  }

  async create(createRoleDto: any): Promise<IResponse<any>> {
    const role = this.roleRepo.create(createRoleDto);
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

  async getAllRolesAndCount(): Promise<IResponse<any>> {
    const [roles, count] = await this.roleRepo.findAndCount();
    
    if(!roles) {
      throw new NotFoundException('Roles not found');
    }

    return {
      data: roles,
      status: HttpStatus.OK,
      totalItems: count
    };
  }

  getRoleById(id: UUID) {
    const role = this.roleRepo.findOne({where: {id: id}});
    if(!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async getRoleByName(name: string) {
    const role = await this.roleRepo.findOne({where: {name: name}});

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
