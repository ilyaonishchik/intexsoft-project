import { Controller } from '@nestjs/common';
import { ProductParameterService } from './product-parameter.service';

@Controller('product-parameters')
export class ProductParameterController {
  constructor(private readonly productParameterService: ProductParameterService) {}
}
