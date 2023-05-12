import useSWR from 'swr';
import { Product } from '../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('An error occurred while fetching products.');
  const products = (await response.json()) as Product[];
  return products;
};

export const useProducts = () =>
  useSWR<Product[], Error>(`${import.meta.env.VITE_SERVER_URL}/products`, fetcher, {
    revalidateOnFocus: false,
  });
