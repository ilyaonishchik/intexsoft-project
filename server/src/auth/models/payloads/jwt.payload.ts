import { Role } from 'src/roles/models/entities/role.entity';

export class JwtPayload {
  email: string;
  roles: Role[];
}
