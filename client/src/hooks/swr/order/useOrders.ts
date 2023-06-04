import useSWR from 'swr';
import { Order, OrderStatus, PaginationArgs } from '../../../types';
import { generateQuery } from '../../../utils/generateQuery';

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('An error occurred while fetching orders.');
  return (await response.json()) as [Order[], number];
};

type Args = {
  pagination?: PaginationArgs;
  status?: OrderStatus;
};

export const useOrders = (args?: Args) => {
  const query = generateQuery(args);
  return useSWR<[Order[], number], Error>(`${import.meta.env.VITE_SERVER_URL}/orders${query}`, fetcher);
};
