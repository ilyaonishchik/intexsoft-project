import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';
import { CreateOrderDto } from './models/dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@DecodedUser() { id }: JwtDecodedPayload, @Body() dto: CreateOrderDto): Promise<string> {
    return this.orderService.create(id, dto);
  }
}
