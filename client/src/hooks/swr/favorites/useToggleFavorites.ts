import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { Favorites, NestError } from '../../../types';

type Arg = {
  productId: number;
};

const fetcher = async (url: string, { arg }: { arg: Arg }) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  if (!response.ok) {
    const { message } = (await response.json()) as NestError;
    throw new Error(message);
  }
  return (await response.json()) as Favorites;
};

export const useToggleFavorites = () =>
  useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/favorites`, fetcher, {
    onSuccess: () =>
      mutate(key => typeof key === 'string' && key.startsWith(`${import.meta.env.VITE_SERVER_URL}/favorites`)),
  });
