import { Module } from '@nestjs/common';
import { ComparedService } from './compared.service';
import { ComparedController } from './compared.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compared } from './models/entities/compared.entity';
import { Product } from 'src/product/models/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compared, Product])],
  controllers: [ComparedController],
  providers: [ComparedService],
})
export class ComparedModule {}
