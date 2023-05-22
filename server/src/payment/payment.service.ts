import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { v4 } from 'uuid';
import { ICreatePayment, IPaymentList, Payment, PaymentStatuses, YooCheckout } from '@a2seven/yoo-checkout';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
  constructor(@Inject(forwardRef(() => OrderService)) private readonly orderService: OrderService) {}

  private readonly checkout = new YooCheckout({
    shopId: process.env.YOOKASSA_SHOP_ID,
    secretKey: process.env.YOOKASSA_SECRET_KEY,
  });

  create(orderId: number, value: number): Promise<Payment> {
    const payload: ICreatePayment = {
      amount: {
        value: String(value),
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.CLIENT_URL,
      },
      metadata: {
        orderId,
      },
    };
    try {
      return this.checkout.createPayment(payload, v4());
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll(): Promise<IPaymentList> {
    try {
      return this.checkout.getPaymentList();
    } catch (e) {
      throw new Error(e);
    }
  }

  findOne(id: string): Promise<Payment> {
    try {
      return this.checkout.getPayment(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  async handleNotification(notification: { object: Payment }): Promise<void> {
    console.log(notification);
    await this.orderService.update(notification.object.metadata.orderId, { paymentStatus: notification.object.status });
    switch (notification.object.status) {
      case PaymentStatuses.canceled:
        {
          console.log('here');
        }
        break;
    }
  }
}
