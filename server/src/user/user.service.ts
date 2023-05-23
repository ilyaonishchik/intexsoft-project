import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/entities/user.entity';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly cartService: CartService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const defaultRole = await this.roleService.findDefault();
    const user = await this.userRepository.save({ ...dto, roles: [defaultRole] });
    await this.cartService.create(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: { roles: true } });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: { roles: true } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
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
}
