import useSWR from 'swr';
import { PaginationArgs, Product, SortingArgs } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('An error occurred while fetching products.');
  return (await response.json()) as [Product[], number];
};

type Args = Partial<PaginationArgs> & Partial<SortingArgs>;

export const useProducts = ({ skip = 0, take = 10, sortBy = 'updatedAt', order = 'desc' }: Args) => {
  return useSWR<[Product[], number], Error>(
    `${import.meta.env.VITE_SERVER_URL}/products?skip=${skip}&take=${take}&sortBy=${sortBy}&order=${order}`,
    fetcher
  );
};
