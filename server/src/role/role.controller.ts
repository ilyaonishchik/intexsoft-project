import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './models/entities/role.entity';
import { CreateRoleDto } from './models/dto/create-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() { name }: CreateRoleDto): Promise<Role> {
    return this.roleService.create(name);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}
