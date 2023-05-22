import { Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './models/entities/order.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@DecodedUser() { id }: JwtDecodedPayload): Promise<Order> {
    return this.orderService.create(id);
  }
}
