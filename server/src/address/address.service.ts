import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './models/entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './models/dto/create-address.dto';
import { UserService } from 'src/user/user.service';
import { MessageResponse } from 'src/_common/message.response';
import { UpdateAddressDto } from './models/dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, dto: CreateAddressDto): Promise<Address> {
    const user = await this.userService.findOne(userId);
    return this.addressRepository.save({ user, ...dto });
  }

  findAll(userId: number): Promise<Address[]> {
    return this.addressRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) throw new NotFoundException(`Address with id ${id} not found`);
    return address;
  }

  async update(id: number, dto: UpdateAddressDto): Promise<Address> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) throw new NotFoundException(`Address with id ${id} not found`);
    return this.addressRepository.save({ ...address, ...dto });
  }

  async delete(id: number): Promise<MessageResponse> {
    await this.addressRepository.delete({ id });
    return { message: `Address with id ${id} deleted successfully` };
  }
}
