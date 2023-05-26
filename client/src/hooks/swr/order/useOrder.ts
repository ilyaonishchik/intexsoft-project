import useSWR from 'swr';
import { Order } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('An error occurred while fetching order.');
  return (await response.json()) as Order;
};

export const useOrder = (id: number) => {
  return useSWR<Order, Error>(`${import.meta.env.VITE_SERVER_URL}/orders/${id}`, fetcher);
};
