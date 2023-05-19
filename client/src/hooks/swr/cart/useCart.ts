import useSWR from 'swr';
import { Cart } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('An error occurred while fetching cart.');
  const categories = (await response.json()) as Cart;
  return categories;
};

export const useCart = () => useSWR<Cart, Error>(`${import.meta.env.VITE_SERVER_URL}/cart`, fetcher);
