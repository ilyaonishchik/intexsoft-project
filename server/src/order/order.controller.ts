import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';
import { CreateOrderDto } from './models/dto/create-order.dto';
import { Order } from './models/entities/order.entity';
import { OrderStatus } from './models/types/order-status.type';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@DecodedUser() { id }: JwtDecodedPayload, @Body() dto: CreateOrderDto): Promise<string> {
    return this.orderService.create(id, dto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(
    @DecodedUser() { id }: JwtDecodedPayload,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('sortBy') sortBy = 'createdAt',
    @Query('order') order = 'desc',
    @Query('status') status?: OrderStatus,
  ): Promise<[Order[], number]> {
    return this.orderService.findAll(id, skip, take, sortBy, order, status);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }
}
