export class CreateUserDto {
  provider?: string;
  email: string;
  passwordHash?: string;
  name?: string;
  surname?: string;
  avatar?: string;
  verificationLink?: string;
  verified: boolean;
}
