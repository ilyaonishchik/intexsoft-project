import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private readonly cartRepository: Repository<Cart>) {}

  create(user: User): Promise<Cart> {
    return this.cartRepository.save({ user });
  }

  findOneByUserEmail(email: string) {
    return this.cartRepository.findOne({
      where: { user: { email } },
      relations: { items: { product: { images: { image: true } } } },
    });
  }
}
