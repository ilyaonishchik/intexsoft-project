import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './models/entities/order.entity';
import { Repository } from 'typeorm';
import { CartService } from 'src/cart/cart.service';
import { PaymentService } from 'src/payment/payment.service';
import { UpdateOrderDto } from './models/dto/update-order.dto';
import { CreateOrderDto } from './models/dto/create-order.dto';
import { OrderStatus } from './models/types/order-status.type';
import { User } from 'src/user/models/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Address } from 'src/address/models/entities/address.entity';
import { OrderItem } from 'src/order-item/models/entities/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => PaymentService)) private readonly paymentService: PaymentService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
    private readonly cartService: CartService,
  ) {}

  async create(userId: number, { name, surname, addressId }: CreateOrderDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: { items: { product: true } },
    });
    if (!cart) throw new NotFoundException(`Cart of user with id ${userId} not found`);
    const address = await this.addressRepository.findOne({ where: { id: addressId } });
    if (!address) throw new NotFoundException(`Address with id ${addressId} not found`);
    const amount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const order = await this.orderRepository.save({ user, amount, name, surname, address });
    cart.items.forEach(async (item) => {
      await this.orderItemRepository.save({
        order,
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      });
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
