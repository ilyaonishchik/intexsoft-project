import useSWR from 'swr';
import { ProductGroup } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('An error occurred while fetching product group');
  return (await response.json()) as ProductGroup;
};

export const useProductGroup = (id: number) => {
  return useSWR<ProductGroup, Error>(`${import.meta.env.VITE_SERVER_URL}/product-groups/${id}`, fetcher);
};
