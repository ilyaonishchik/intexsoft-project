import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from './filter.service';

@Controller('filters')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  getAll(@Query('categoryName') categoryName: string) {
    return this.filterService.getAll(categoryName);
  }
}
