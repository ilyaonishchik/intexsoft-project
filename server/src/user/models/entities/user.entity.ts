import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/role/models/entities/role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  provider: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true, unique: true })
  verificationLink: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  banned: boolean;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'roleId' },
  })
  roles: Role[];
}
