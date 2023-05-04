import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './guards/google.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(GoogleGuard)
  @Get('google')
  google() {}

  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  googleRedirect(@Req() req: Request) {
    return req.user;
  }
}
