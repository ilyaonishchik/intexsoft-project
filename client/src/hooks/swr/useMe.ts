import useSWR from 'swr';
import { User } from '../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) throw new Error('An error occurred while fetching me.');
  const me = (await response.json()) as User;
  return me;
};

export const useMe = () => useSWR<User, Error>(`${import.meta.env.VITE_SERVER_URL}/auth/me`, fetcher);
