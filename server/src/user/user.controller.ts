import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';
import { UpdateUserDto } from './models/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Put()
  @UseGuards(JwtGuard)
  update(@DecodedUser() { id }: JwtDecodedPayload, @Body() dto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }
}
