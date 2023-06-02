import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/entities/order.entity';
import { CartModule } from 'src/cart/cart.module';
import { OrderItemModule } from 'src/order-item/order-item.module';
import { PaymentModule } from 'src/payment/payment.module';
import { AddressModule } from 'src/address/address.module';
import { User } from 'src/user/models/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Address } from 'src/address/models/entities/address.entity';
import { OrderItem } from 'src/order-item/models/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, User, Cart, Address, OrderItem]),
    forwardRef(() => PaymentModule),
    CartModule,
    OrderItemModule,
    AddressModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
