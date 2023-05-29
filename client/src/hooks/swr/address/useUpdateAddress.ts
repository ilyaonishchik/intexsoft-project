import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { Address } from '../../../types';

type Arg = Partial<Omit<Address, 'id'>>;

const fetcher = async (url: string, { arg }: { arg: Arg }) => {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  if (!response.ok) throw new Error('Error occured while updating the address');
  return (await response.json()) as Address;
};

export const useUpdateAddress = (id: number) =>
  useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/addresses/${id}`, fetcher, {
    onSuccess: () =>
      mutate(key => typeof key === 'string' && key.startsWith(`${import.meta.env.VITE_SERVER_URL}/addresses`)),
  });
