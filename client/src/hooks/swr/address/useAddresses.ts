import useSWR from 'swr';
import { Address } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) throw new Error('An error occurred while fetching addresses.');
  return (await response.json()) as Address[];
};

export const useAddresses = () => useSWR<Address[], Error>(`${import.meta.env.VITE_SERVER_URL}/addresses`, fetcher);
