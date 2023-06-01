import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/models/entities/order.entity';
import { User } from 'src/user/models/entities/user.entity';
import { Product } from 'src/product/models/entities/product.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Order>,
  ) {}

  async create(userId: number, { productId, rating, text }: CreateReviewDto): Promise<Review> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);
    const orders = await this.orderRepository.find({
      where: { user: { id: user.id }, items: { product: { id: product.id } } },
    });
    const succeededOrder = orders.find((order) => order.status === 'succeeded');
    if (!succeededOrder) throw new ForbiddenException('You can leave a review only about the purchased product');
    return this.reviewRepository.save({ user, product, rating, text });
  }

  findAll(skip: number, take: number, productId: number): Promise<[Review[], number]> {
    return this.reviewRepository.findAndCount({
      where: { product: { id: productId } },
      skip,
      take,
      relations: { user: true },
    });
  }
}
