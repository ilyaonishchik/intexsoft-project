import useSWR from 'swr';
import { Compared, NestError } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    const { message } = (await response.json()) as NestError;
    throw new Error(message);
  }
  return (await response.json()) as Compared;
};

export const useCompared = () =>
  useSWR<Compared, Error>(`${import.meta.env.VITE_SERVER_URL}/compared`, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
