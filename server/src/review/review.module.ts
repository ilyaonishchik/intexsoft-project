import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Order } from 'src/order/models/entities/order.entity';
import { User } from 'src/user/models/entities/user.entity';
import { Product } from 'src/product/models/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Order, User, Product])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
