import useSWR from 'swr';
import { Cart, NestError } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    const { message } = (await response.json()) as NestError;
    throw new Error(message);
  }
  return (await response.json()) as Cart;
};

export const useCart = () =>
  useSWR<Cart, Error>(`${import.meta.env.VITE_SERVER_URL}/cart`, fetcher, { revalidateOnFocus: false });
