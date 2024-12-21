import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UUID } from 'crypto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  create(@Body() createRoleDto: any) {
    return this.roleService.create(createRoleDto);
  }

  @Get('countAll')
  countAll() {
    return this.roleService.countAll();
  }

  @Get('findAndCount')
  findAndCount() {
    return this.roleService.findAndCount();
  }

  @Get('getAllRoles')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.getRoleById(id as UUID);
  }

  @Post('update')
  update(@Body() updateRoleDto: any) {
    return this.roleService.update(updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id as UUID);
  }
}
