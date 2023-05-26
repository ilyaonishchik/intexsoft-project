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
import { UserService } from 'src/user/user.service';
import { OrderStatus } from './models/types/order-status.type';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    private readonly cartService: CartService,
    private readonly orderItemService: OrderItemService,
    private readonly addressService: AddressService,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, { name, surname, addressId }: CreateOrderDto): Promise<string> {
    const user = await this.userService.findOne(userId);
    const cart = await this.cartService.findOneByUserId(user.id);
    const address = await this.addressService.findOne(addressId);
    const amount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const order = await this.orderRepository.save({ user, amount, name, surname, address });
    cart.items.forEach(async (item) => {
      await this.orderItemService.create({ orderId: order.id, productId: item.product.id, quantity: item.quantity });
    });
    await this.cartService.clear(cart.id);
    const payment = await this.paymentService.create(order.id, order.amount);
    return payment.confirmation.confirmation_url;
  }

  findAll(
    userId: number,
    skip: number,
    take: number,
    sortBy: string,
    order: string,
    status: OrderStatus,
  ): Promise<[Order[], number]> {
    return this.orderRepository.findAndCount({
      where: { user: { id: userId }, status: status || null },
      skip,
      take,
      order: { [sortBy]: order },
    });
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: { items: { product: { images: { image: true } } }, address: true },
    });
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    return this.orderRepository.save({ ...order, ...dto });
  }
}
