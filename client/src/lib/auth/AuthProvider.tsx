import { ReactNode, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { NestError, SignInDto, SignUpDto, User } from '../../types';
import { useMe } from '../../hooks/swr/auth/useMe';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<User | null>(null);
  const { data } = useMe();

  useEffect(() => {
    if (data) setMe(data);
  }, [data]);

  const signIn = async (dto: SignInDto) => {
    const repsonse = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signIn`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!repsonse.ok) {
      const { message } = (await repsonse.json()) as NestError;
      throw new Error(message);
    }
    const user = (await repsonse.json()) as User;
    setMe(user);
  };

  const signUp = async (dto: SignUpDto) => {
    const repsonse = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signUp`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!repsonse.ok) {
      const { message } = (await repsonse.json()) as NestError;
      throw new Error(message);
    }
    const user = (await repsonse.json()) as User;
    setMe(user);
  };

  const signOut = () =>
    fetch(`${import.meta.env.VITE_SERVER_URL}/auth/signOut`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => setMe(null))
      .catch(err => console.log(err));

  const value = useMemo(() => ({ me, signIn, signUp, signOut }), [me]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
