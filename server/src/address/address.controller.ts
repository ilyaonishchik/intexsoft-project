import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './models/entities/address.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';
import { CreateAddressDto } from './models/dto/create-address.dto';

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
}
