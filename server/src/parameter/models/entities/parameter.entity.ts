import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ParameterCategory } from 'src/parameter-category/models/entities/parameter-category.entity';
import { ProductParameter } from 'src/product-parameter/models/entities/product-parameter.entity';

@Entity('parameter')
export class Parameter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ParameterCategory, (category) => category.parameters)
  category: ParameterCategory;

  @Column({ unique: true })
  name: string;

  @Column()
  label: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true, length: 1000 })
  description: string;

  @Column()
  ordinal: number;

  @Column()
  filterType: 'check' | 'range';

  @Column({ nullable: true })
  comparable: boolean;

  @Column({ nullable: true })
  benchmark: string;

  @Column({ nullable: true })
  comparisonType: 'boolean' | 'number' | 'score';

  @Column({ nullable: true })
  defaultValue: string;

  @Column({ nullable: true })
  defaultScore: number;

  @OneToMany(() => ProductParameter, (productParameter) => productParameter.parameter)
  productParameters: ProductParameter[];
}
