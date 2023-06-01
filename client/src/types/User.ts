import { Address } from '.';
import { Role } from './Role';

export type User = {
  id: number;
  createdAt: unknown;
  updatedAt: unknown;
  provider?: string;
  email: string;
  passwordHash?: string;
  name: string;
  surname: string;
  avatar?: string;
  verificationLink?: string;
  verified: boolean;
  banned: boolean;
  roles: Role[];
  addresses?: Address[];
};
