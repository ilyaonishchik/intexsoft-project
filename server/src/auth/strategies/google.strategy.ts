import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { CreateUserDto } from 'src/users/models/dto/create-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/redirect`,
      scope: ['profile', 'email'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    const { provider, emails, name, photos } = profile;
    const createUserDto: CreateUserDto = {
      provider,
      email: emails[0].value,
      name: name.givenName,
      surname: name.familyName,
      avatar: photos[0].value,
      verified: Boolean(emails[0].verified),
    };
    done(null, createUserDto);
  }
}
