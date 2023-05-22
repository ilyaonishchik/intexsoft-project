import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { MessageResponse } from 'src/_common/message.response';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly cartItemService: CartItemService,
  ) {}

  create(user: User): Promise<Cart> {
    return this.cartRepository.save({ user });
  }

  findOneByUserId(id: number) {
    return this.cartRepository.findOne({
      where: { user: { id } },
      relations: { items: { product: { images: { image: true } } } },
    });
  }

  findOneByUserEmail(email: string) {
    return this.cartRepository.findOne({
      where: { user: { email } },
      relations: { items: { product: { images: { image: true } } } },
    });
  }

  async clear(id: number): Promise<MessageResponse> {
    const cart = await this.findOneByUserId(id);
    cart.items.forEach(async (item) => await this.cartItemService.delete(item.id));
    return { message: `Cart of user with id ${id} cleared successfully` };
  }
}
