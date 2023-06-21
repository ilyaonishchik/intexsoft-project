import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/entities/user.entity';
import { CreateUserDto } from './models/dto/create-user.dto';
import { UpdateUserDto } from './models/dto/update-user.dto';
import { Role } from 'src/role/models/entities/role.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Compared } from 'src/compared/models/entities/compared.entity';
import { Favorites } from 'src/favorites/models/entities/favorites.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Compared) private readonly comparedRepository: Repository<Compared>,
    @InjectRepository(Favorites) private readonly favoritesRepository: Repository<Favorites>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const defaultRole = await this.roleRepository.findOne({ where: { name: 'user' } });
    if (!defaultRole) throw new NotFoundException(`Role with name user not found`);
    const user = await this.userRepository.save({ ...dto, roles: [defaultRole] });
    await this.cartRepository.save({ user });
    await this.comparedRepository.save({ user });
    await this.favoritesRepository.save({ user });
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
