import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './models/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() { name }: { name: string }): Promise<Role> {
    return this.rolesService.create(name);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }
}
