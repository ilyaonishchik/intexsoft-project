import useSWR from 'swr';
import { PaginationArgs, Review } from '../../../types';
import { generateQuery } from '../../../utils/generateQuery';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('An error occurred while fetching reviews');
  return (await response.json()) as [Review[], number];
};

type Args = {
  pagination?: PaginationArgs;
  productId?: number;
};

export const useReviews = (args?: Args) => {
  const query = generateQuery(args);
  return useSWR<[Review[], number], Error>(`${import.meta.env.VITE_SERVER_URL}/reviews${query}`, fetcher);
};
