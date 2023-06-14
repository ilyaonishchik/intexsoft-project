import { Controller, Get, Param } from '@nestjs/common';
import { ProductGroupService } from './product-group.service';
import { ProductGroup } from './models/entities/product-group.entity';

@Controller('product-groups')
export class ProductGroupController {
  constructor(private readonly productGroupService: ProductGroupService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductGroup> {
    return this.productGroupService.findOne(id);
  }
}
