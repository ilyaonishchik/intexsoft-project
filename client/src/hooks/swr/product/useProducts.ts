import useSWR from 'swr';
import { PaginationArgs, Product, SortingArgs } from '../../../types';
import { generateQuery } from '../../../utils/generateQuery';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('An error occurred while fetching products');
  return (await response.json()) as [Product[], number];
};

type PriceArgs = {
  minPrice: number;
  maxPrice: number;
};

type Args = {
  pagination?: PaginationArgs;
  sorting?: SortingArgs;
  categoryName?: string;
  price?: PriceArgs;
  filters?: object;
};

export const useProducts = (args?: Args) => {
  const query = generateQuery(args);
  return useSWR<[Product[], number], Error>(`${import.meta.env.VITE_SERVER_URL}/products${query}`, fetcher);
};
