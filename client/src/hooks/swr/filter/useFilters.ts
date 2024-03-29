import useSWR from 'swr';
import { Filter, NestError, PriceFilter } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    const { message } = (await response.json()) as NestError;
    throw new Error(message);
  }
  return (await response.json()) as [PriceFilter, Filter[]];
};

export const useFilters = (categoryName: string) =>
  useSWR<[PriceFilter, Filter[]], Error>(
    `${import.meta.env.VITE_SERVER_URL}/filters?categoryName=${categoryName}`,
    fetcher
  );
