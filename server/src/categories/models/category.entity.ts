import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from 'src/images/models/image.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  image: Image;

  @Column()
  ordinal: number;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
