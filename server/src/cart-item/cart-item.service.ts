import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/models/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { MessageResponse } from 'src/_common/message.response';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(@InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>) {}

  create(cart: Cart, product: Product, quantity: number): Promise<CartItem> {
    return this.cartItemRepository.save({ cart, product, quantity });
  }

  async update(id: number, dto: UpdateCartItemDto): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({ where: { id } });
    return this.cartItemRepository.save({ ...cartItem, ...dto });
  }

  async delete(id: number): Promise<MessageResponse> {
    await this.cartItemRepository.delete({ id });
    return { message: `Cart item with id ${id} deleted successfully` };
  }
}
