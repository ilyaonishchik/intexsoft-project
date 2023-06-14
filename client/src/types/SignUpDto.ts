import { SignInDto } from '.';

export type SignUpDto = SignInDto & {
  name: string;
  surname: string;
};
