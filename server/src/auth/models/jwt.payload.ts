import { Role } from 'src/roles/models/role.entity';

export class JwtPayload {
  email: string;
  roles: Role[];
}
