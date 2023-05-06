import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './models/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private rolesService: RolesService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const defaultRole = await this.rolesService.findDefault();
    const user = this.usersRepository.create({ ...dto, roles: [defaultRole] });
    return this.usersRepository.save(user);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email }, relations: { roles: true } });
  }

  findOneByVerificationLink(verificationLink: string): Promise<User> {
    return this.usersRepository.findOneBy({ verificationLink });
  }

  async verify(id: number): Promise<User> {
    await this.usersRepository.update({ id }, { verified: true });
    return this.usersRepository.findOneBy({ id });
  }
}
