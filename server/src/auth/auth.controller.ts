import {
  Body,
  ConflictException,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models/entities/user.entity';
import { CreateUserDto } from 'src/user/models/dto/create-user.dto';
import { GoogleGuard } from './guards/google.guard';
import { JwtPayload } from './models/payloads/jwt.payload';
import { SignUpDto } from './models/dto/sign-up.dto';
import { SignInDto } from './models/dto/sign-in.dto';
import { JwtGuard } from './guards/jwt.guard';
import { DecodedUser } from './decorators/decoded-user.decorator';
import { JwtDecodedPayload } from './models/payloads/jwt-decoded.payload';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService, private jwtService: JwtService) {}

  @UseGuards(GoogleGuard)
  @Get('google')
  google() {}

  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req, @Res() response: Response) {
    const createUserDto: CreateUserDto = req.user;
    let user = await this.userService.findOneByEmail(createUserDto.email);
    if (!user) user = await this.userService.create(createUserDto);
    const jwtPayload: JwtPayload = { email: user.email, roles: user.roles };
    const accessToken = this.jwtService.sign(jwtPayload, { expiresIn: '30d' });
    response.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
    response.redirect(process.env.CLIENT_URL);
  }

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) response: Response): Promise<User> {
    const { email, password, name, surname } = signUpDto;
    const candidate = await this.userService.findOneByEmail(email);
    if (candidate) throw new ConflictException('User with this email already exists');
    const passwordHash = bcrypt.hashSync(password, 5);
    const verificationLink = uuidv4();
    const createUserDto: CreateUserDto = { email, passwordHash, name, surname, verified: false, verificationLink };
    const user = await this.userService.create(createUserDto);
    await this.authService.sendVerificationMail(
      user.email,
      `${process.env.SERVER_URL}/auth/verify/${user.verificationLink}`,
    );
    const jwtPayload: JwtPayload = { email: user.email, roles: user.roles };
    const accessToken = this.jwtService.sign(jwtPayload, { expiresIn: '30d' });
    response.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
    return user;
  }

  @Post('signIn')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) response: Response) {
    const { email, password } = signInDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    if (user.provider) throw new UnauthorizedException(`Sign in with ${user.provider}, please`);
    const isPasswordMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordMatch) throw new UnauthorizedException('Wrong password');
    const jwtPayload: JwtPayload = { email: user.email, roles: user.roles };
    const accessToken = this.jwtService.sign(jwtPayload, { expiresIn: '30d' });
    response.cookie('accessToken', accessToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
    return user;
  }

  @Post('signOut')
  signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken');
    return { message: 'You have successfully signed out of your account' };
  }

  @Get('verify/:link')
  async verify(@Param('link') link: string, @Res() response: Response) {
    const user = await this.userService.findOneByVerificationLink(link);
    if (!user) throw new Error('Uncorrect verification link');
    await this.userService.verify(user.id);
    response.redirect(process.env.CLIENT_URL);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async me(@DecodedUser() { email }: JwtDecodedPayload): Promise<User> {
    return await this.userService.findOneByEmail(email);
  }
}
