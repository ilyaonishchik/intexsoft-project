import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';
import { CreateCartItemDto } from 'src/cart-item/dto/create-cart-item.dto';
import { ProductService } from 'src/product/product.service';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { MessageResponse } from 'src/_common/message.response';
import { Cart } from './entities/cart.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { UpdateCartItemDto } from 'src/cart-item/dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly cartItemService: CartItemService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async createCartItem(
    @DecodedUser() { email }: JwtDecodedPayload,
    @Body() { productId, quantity }: CreateCartItemDto,
  ): Promise<CartItem> {
    const cart = await this.cartService.findOneByUserEmail(email);
    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);
    const cartItem = cart.items.find((item) => item.product.id === productId);
    if (cartItem) return cartItem;
    return this.cartItemService.create(cart, product, quantity);
  }

  @Get()
  @UseGuards(JwtGuard)
  findOne(@DecodedUser() { email }: JwtDecodedPayload): Promise<Cart> {
    return this.cartService.findOneByUserEmail(email);
  }

  @Put(':cartItemId')
  @UseGuards(JwtGuard)
  updateCartItem(@Param('cartItemId') cartItemId: number, @Body() dto: UpdateCartItemDto): Promise<CartItem> {
    return this.cartItemService.update(cartItemId, dto);
  }

  @Delete(':cartItemId')
  @UseGuards(JwtGuard)
  deleteCartItem(@Param('cartItemId') cartItemId: number): Promise<MessageResponse> {
    return this.cartItemService.delete(cartItemId);
  }
}
