export class UpdateOrderDto {
  paymentStatus: 'waiting_for_capture' | 'pending' | 'succeeded' | 'canceled';
}
