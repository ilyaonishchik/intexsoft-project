import { ICreatePayment, ICreateWebHook, IPaymentList, Payment, WebHook, YooCheckout } from '@a2seven/yoo-checkout';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as crypto from 'crypto';

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

  createWebhook(): Promise<WebHook> {
    const checkout = this.createCheckout();
    const payload: ICreateWebHook = {
      event: 'payment.succeeded',
      url: `https://127.0.0.1:443/payments/webhooks`,
    };
    try {
      checkout
        .createWebHook(payload, v4())
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (e) {
      throw new Error(e);
    }
    return;
  }

  async handleNotification(notification: any): Promise<void> {
    console.log(notification);
  }
}
