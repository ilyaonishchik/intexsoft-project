import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/entities/user.entity';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './models/dto/create-user.dto';
import { CartService } from 'src/cart/cart.service';
import { UpdateUserDto } from './models/dto/update-user.dto';

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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }, relations: { roles: true } });
    if (!user) throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }

  async findOneByVerificationLink(verificationLink: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ verificationLink });
    if (!user) throw new NotFoundException(`User with verification link ${verificationLink} not found`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return this.userRepository.save({ ...user, ...dto });
  }

  async verify(id: number): Promise<User> {
    await this.userRepository.update({ id }, { verified: true });
    return this.userRepository.findOneBy({ id });
  }
}
