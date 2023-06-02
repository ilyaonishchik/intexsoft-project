import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { MessageResponse } from 'src/_common/message.response';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async findOneByUserId(id: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id } },
      relations: { items: { product: { images: { image: true } } } },
    });
    if (!cart) throw new NotFoundException(`Cart of user with id ${id} not found`);
    return cart;
  }

  async clear(userId: number): Promise<MessageResponse> {
    const cart = await this.cartRepository.findOne({ where: { user: { id: userId } }, relations: { items: true } });
    if (!cart) throw new NotFoundException(`Cart of user with id ${userId} not found`);
    cart.items.forEach(async (item) => await this.cartItemRepository.delete({ id: item.id }));
    return { message: `Cart of user with id ${userId} cleared successfully` };
  }
}
