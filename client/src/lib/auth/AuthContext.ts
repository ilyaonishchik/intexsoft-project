import { createContext } from 'react';
import { SignInDto, SignUpDto, User } from '../../types';

type AuthContextValue = {
  me: User | null;
  signIn: (dto: SignInDto) => Promise<void>;
  signUp: (dto: SignUpDto) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
  me: null,
  signIn: () => {
    throw new Error('Function must be overridden');
  },
  signUp: () => {
    throw new Error('Function must be overridden');
  },
  signOut: () => {
    throw new Error('Function must be overridden');
  },
});
