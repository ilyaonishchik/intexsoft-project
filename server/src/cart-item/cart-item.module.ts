import { Module, forwardRef } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), forwardRef(() => CartModule)],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
