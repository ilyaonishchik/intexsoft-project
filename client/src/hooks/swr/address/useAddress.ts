import useSWR from 'swr';
import { Address } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) throw new Error('An error occurred while fetching address.');
  return (await response.json()) as Address;
};

export const useAddress = (id: number) =>
  useSWR<Address, Error>(`${import.meta.env.VITE_SERVER_URL}/addresses/${id}`, fetcher);
