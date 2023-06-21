import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './models/entities/user.entity';
import { UserController } from './user.controller';
import { Role } from 'src/role/models/entities/role.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Compared } from 'src/compared/models/entities/compared.entity';
import { Favorites } from 'src/favorites/models/entities/favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Cart, Compared, Favorites])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
