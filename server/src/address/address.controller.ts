import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './models/entities/address.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';
import { CreateAddressDto } from './models/dto/create-address.dto';
import { MessageResponse } from 'src/_common/message.response';
import { UpdateAddressDto } from './models/dto/update-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@DecodedUser() { id }: JwtDecodedPayload, @Body() dto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(id, dto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@DecodedUser() { id }: JwtDecodedPayload): Promise<Address[]> {
    return this.addressService.findAll(id);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: number, @Body() dto: UpdateAddressDto): Promise<Address> {
    return this.addressService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  delete(@Param('id') id: number): Promise<MessageResponse> {
    return this.addressService.delete(id);
  }
}
