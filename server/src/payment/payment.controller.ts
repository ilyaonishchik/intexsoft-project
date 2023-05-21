import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Payment, IPaymentList } from '@a2seven/yoo-checkout';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() { value }: CreatePaymentDto) {
    return this.paymentService.create(value);
  }

  @Get()
  findAll(): Promise<IPaymentList> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Post('notification')
  async handleNotification(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.paymentService.handleNotification(req.body);
    res.status(200).send();
  }
}
