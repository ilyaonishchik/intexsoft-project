import { Module } from '@nestjs/common';
import { ProductParameterService } from './product-parameter.service';
import { ProductParameterController } from './product-parameter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductParameter } from './models/entities/product-parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductParameter])],
  controllers: [ProductParameterController],
  providers: [ProductParameterService],
})
export class ProductParameterModule {}
