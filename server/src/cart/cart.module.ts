import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { CartItemModule } from 'src/cart-item/cart-item.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), forwardRef(() => UserModule), ProductModule, CartItemModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
