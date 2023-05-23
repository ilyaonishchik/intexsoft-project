import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/entities/order.entity';
import { Repository } from 'typeorm';
import { CartService } from 'src/cart/cart.service';
import { OrderItemService } from 'src/order-item/order-item.service';
import { PaymentService } from 'src/payment/payment.service';
import { UpdateOrderDto } from './models/dto/update-order.dto';
import { CreateOrderDto } from './models/dto/create-order.dto';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderItemService: OrderItemService,
    private readonly addressService: AddressService,
  ) {}

  async create(id: number, { name, surname, addressId }: CreateOrderDto): Promise<string> {
    const cart = await this.cartService.findOneByUserId(id);
    const address = await this.addressService.findOne(addressId);
    const amount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const order = await this.orderRepository.save({ amount, name, surname, address });
    cart.items.forEach(async (item) => {
      await this.orderItemService.create({ orderId: order.id, productId: item.product.id, quantity: item.quantity });
    });
    await this.cartService.clear(cart.id);
    const payment = await this.paymentService.create(order.id, order.amount);
    return payment.confirmation.confirmation_url;
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    return this.orderRepository.save({ ...order, ...dto });
  }
}
