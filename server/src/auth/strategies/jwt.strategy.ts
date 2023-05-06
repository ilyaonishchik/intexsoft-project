import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        let accessToken = null;
        if (req && req.cookies) accessToken = req.cookies['accessToken'];
        return accessToken || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      },
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    return payload;
  }
}
