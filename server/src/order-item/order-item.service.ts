import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { OrderItem } from './models/entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './models/dto/create-order-item.dto';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
    @Inject(forwardRef(() => OrderService)) private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  async create({ orderId, productId, quantity }: CreateOrderItemDto): Promise<OrderItem> {
    const order = await this.orderService.findOne(orderId);
    if (!order) throw new NotFoundException(`Order with id ${orderId} not found`);
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException(`Product with id ${orderId} not found`);
    return this.orderItemRepository.save({ order, product, quantity, price: product.price });
  }
}
