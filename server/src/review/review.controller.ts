import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@DecodedUser() { id }: JwtDecodedPayload, @Body() dto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(id, dto);
  }

  @Get()
  findAll(
    @Query('skip') skip: number,
    @Query('take') take: number,
    @Query('productId') productId: number,
  ): Promise<[Review[], number]> {
    return this.reviewService.findAll(skip, take, productId);
  }
}
