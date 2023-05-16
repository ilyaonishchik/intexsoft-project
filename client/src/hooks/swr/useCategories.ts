import useSWR from 'swr';
import { Category } from '../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('An error occurred while fetching categories.');
  const categories = (await response.json()) as Category[];
  return categories;
};

export const useCategories = () => useSWR<Category[], Error>(`${import.meta.env.VITE_SERVER_URL}/categories`, fetcher);
