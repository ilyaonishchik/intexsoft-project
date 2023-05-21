import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/models/entities/user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
