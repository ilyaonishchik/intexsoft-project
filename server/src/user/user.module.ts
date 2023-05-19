import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './models/entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { UserController } from './user.controller';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule, CartModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
