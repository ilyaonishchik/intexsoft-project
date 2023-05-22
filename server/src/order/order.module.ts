import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/entities/order.entity';
import { CartModule } from 'src/cart/cart.module';
import { OrderItemModule } from 'src/order-item/order-item.module';
import { PaymentModule } from 'src/payment/payment.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
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
