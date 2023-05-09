import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) {}

  create(name: string): Promise<Role> {
    const role = this.rolesRepository.create({ name });
    return this.rolesRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  findOne(id: number): Promise<Role> {
    return this.rolesRepository.findOne({ where: { id } });
  }

  findDefault(): Promise<Role> {
    return this.rolesRepository.findOneBy({ name: 'user' });
  }
}
