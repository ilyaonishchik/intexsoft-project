import { Role } from 'src/role/models/entities/role.entity';

export class JwtPayload {
  email: string;
  roles: Role[];
}
