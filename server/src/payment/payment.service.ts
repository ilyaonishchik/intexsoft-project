import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ICreatePayment, IPaymentList, Payment, YooCheckout } from '@a2seven/yoo-checkout';

@Injectable()
export class PaymentService {
  createCheckout() {
    return new YooCheckout({
      shopId: process.env.YOOKASSA_SHOP_ID,
      secretKey: process.env.YOOKASSA_SECRET_KEY,
    });
  }

  create(value: string): Promise<Payment> {
    const checkout = this.createCheckout();
    const payload: ICreatePayment = {
      amount: {
        value,
        currency: 'RUB',
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.CLIENT_URL,
      },
    };
    try {
      return checkout.createPayment(payload, v4());
    } catch (e) {
      throw new Error(e);
    }
  }

  findAll(): Promise<IPaymentList> {
    const checkout = this.createCheckout();
    try {
      return checkout.getPaymentList();
    } catch (e) {
      throw new Error(e);
    }
  }

  findOne(id: string): Promise<Payment> {
    const checkout = this.createCheckout();
    try {
      return checkout.getPayment(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  async handleNotification(notification: any): Promise<void> {
    console.log(notification);
  }
}
