import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ComparedService } from './compared.service';
import { Compared } from './models/entities/compared.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';

@Controller('compared')
export class ComparedController {
  constructor(private readonly comparedService: ComparedService) {}

  @Post()
  @UseGuards(JwtGuard)
  toggle(@DecodedUser() { id }: JwtDecodedPayload, @Body() { productId }: { productId: number }): Promise<Compared> {
    return this.comparedService.toggle(id, productId);
  }

  @Get()
  @UseGuards(JwtGuard)
  findOne(@DecodedUser() { id }: JwtDecodedPayload): Promise<Compared> {
    return this.comparedService.findOne(id);
  }
}
