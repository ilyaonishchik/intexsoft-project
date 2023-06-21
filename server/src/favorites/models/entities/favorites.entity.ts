import { Product } from 'src/product/models/entities/product.entity';
import { User } from 'src/user/models/entities/user.entity';
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'favorites_product',
    joinColumn: { name: 'favoritesId' },
    inverseJoinColumn: { name: 'productId' },
  })
  products: Product[];
}
