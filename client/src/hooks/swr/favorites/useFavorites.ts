import useSWR from 'swr';
import { Favorites, NestError } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    const { message } = (await response.json()) as NestError;
    throw new Error(message);
  }
  return (await response.json()) as Favorites;
};

export const useFavorites = () =>
  useSWR<Favorites, Error>(`${import.meta.env.VITE_SERVER_URL}/favorites`, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
