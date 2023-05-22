import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/entities/order.entity';
import { Repository } from 'typeorm';
import { CartService } from 'src/cart/cart.service';
import { OrderItemService } from 'src/order-item/order-item.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    private readonly cartService: CartService,
    private readonly orderItemService: OrderItemService,
  ) {}

  async create(id: number): Promise<Order> {
    const cart = await this.cartService.findOneByUserId(id);
    if (!cart) throw new NotFoundException(`Cart of user with email ${id} not found`);
    const amount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const order = await this.orderRepository.save({ amount });
    cart.items.forEach(async (item) => {
      await this.orderItemService.create({ orderId: order.id, productId: item.product.id });
    });
    await this.cartService.clear(cart.id);
    return order;
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }
}
