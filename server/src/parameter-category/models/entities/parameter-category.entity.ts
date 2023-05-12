import { Parameter } from 'src/parameter/models/entities/parameter.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parameter-categories')
export class ParameterCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  ordinal: number;

  @OneToMany(() => Parameter, (parameter) => parameter.category)
  parameters: Parameter[];
}
