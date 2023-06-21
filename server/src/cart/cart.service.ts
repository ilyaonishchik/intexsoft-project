import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { MessageResponse } from 'src/_common/message.response';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { Product } from 'src/product/models/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
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

  async toggleItem(userId: number, productId: number) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { cart: { user: { id: userId } }, product: { id: productId } },
    });
    if (!cartItem) {
      const cart = await this.cartRepository.findOne({ where: { user: { id: userId } }, relations: { items: true } });
      if (!cart) throw new NotFoundException(`Compared of user with id ${userId} not found`);
      const product = await this.productRepository.findOne({ where: { id: productId } });
      if (!product) throw new NotFoundException(`Product with id ${productId} not found`);
      await this.cartItemRepository.save({ cart, product, quantity: 1 });
      return { message: 'Product added successfully' };
    }
    await this.cartItemRepository.remove([cartItem]);
    return { message: 'Product removed successfully' };
  }
}
