import { Role } from 'src/role/models/entities/role.entity';

export class JwtPayload {
  id: number;
  email: string;
  roles: Role[];
}
