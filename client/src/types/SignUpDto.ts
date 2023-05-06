import { SignInDto } from './SignInDto';

export type SignUpDto = SignInDto & {
  name: string;
  surname: string;
};
