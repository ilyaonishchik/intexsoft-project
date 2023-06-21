import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, JwtStrategy],
})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
        }),
        UserModule,
      ],
      module: AuthModule,
    };
  }
}
