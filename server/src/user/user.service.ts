import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/entities/user.entity';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './models/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const defaultRole = await this.roleService.findDefault();
    const user = this.userRepository.create({ ...dto, roles: [defaultRole] });
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: { roles: true } });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, relations: { roles: true } });
  }

  findOneByVerificationLink(verificationLink: string): Promise<User> {
    return this.userRepository.findOneBy({ verificationLink });
  }

  async verify(id: number): Promise<User> {
    await this.userRepository.update({ id }, { verified: true });
    return this.userRepository.findOneBy({ id });
  }

  async makeAdmin(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: { roles: true } });
    const adminRole = await this.roleService.findOne(1);
    user.roles.push(adminRole);
    return this.userRepository.save(user);
  }
}
