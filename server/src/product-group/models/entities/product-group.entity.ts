import { Parameter } from 'src/parameter/models/entities/parameter.entity';
import { Product } from 'src/product/models/entities/product.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_group')
export class ProductGroup {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.group)
  products: Product[];

  @ManyToMany(() => Parameter)
  @JoinTable({
    name: 'product_group_parameter',
    joinColumn: { name: 'productGroupId' },
    inverseJoinColumn: { name: 'parameterId' },
  })
  parameters: Parameter[];
}
