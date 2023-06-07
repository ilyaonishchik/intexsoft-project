import { Parameter } from 'src/parameter/models/entities/parameter.entity';
import { Product } from 'src/product/models/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_parameter')
export class ProductParameter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Product, (product) => product.parameters)
  product: Product;

  @ManyToOne(() => Parameter, (parameter) => parameter.productParameters)
  parameter: Parameter;

  @Column()
  value: string;

  @Column({ nullable: true })
  score: number;
}
