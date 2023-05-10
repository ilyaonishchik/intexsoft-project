import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ParameterCategory } from 'src/parameter-categories/models/entities/parameter-category.entity';
import { ParameterType } from '../unions/parameter-type.union';

@Entity('parameters')
export class Parameter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  ordinal: number;

  @Column()
  type: ParameterType;

  @ManyToOne(() => ParameterCategory, (category) => category.parameters)
  category: ParameterCategory;
}
