import { Product } from 'src/product/models/entities/product.entity';
import { User } from 'src/user/models/entities/user.entity';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('compared')
export class Compared {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'compared_product',
    joinColumn: { name: 'comparedId' },
    inverseJoinColumn: { name: 'productId' },
  })
  products: Product[];
}
