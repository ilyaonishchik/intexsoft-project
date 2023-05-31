import useSWR from 'swr';
import { Product } from '../../../types/Product';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('An error occurred while fetching product');
  return (await response.json()) as Required<Product>;
};

export const useProduct = (id: number) => {
  return useSWR<Required<Product>, Error>(`${import.meta.env.VITE_SERVER_URL}/products/${id}`, fetcher);
};
