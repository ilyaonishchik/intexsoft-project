import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DecodedUser } from 'src/auth/decorators/decoded-user.decorator';
import { JwtDecodedPayload } from 'src/auth/models/payloads/jwt-decoded.payload';
import { Favorites } from './models/entities/favorites.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @UseGuards(JwtGuard)
  toggle(@DecodedUser() { id }: JwtDecodedPayload, @Body() { productId }: { productId: number }): Promise<Favorites> {
    return this.favoritesService.toggle(id, productId);
  }

  @Get()
  @UseGuards(JwtGuard)
  findOne(@DecodedUser() { id }: JwtDecodedPayload): Promise<Favorites> {
    return this.favoritesService.findOne(id);
  }
}
