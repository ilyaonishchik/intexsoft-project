import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { MessageResponse } from '../../../types';

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Error occured while deleting the cart item');
  return (await response.json()) as MessageResponse;
};

export const useRemoveFromCart = (id: number) =>
  useSWRMutation<MessageResponse, Error>(`${import.meta.env.VITE_SERVER_URL}/cart/${id}`, fetcher, {
    onSuccess: () =>
      mutate(key => typeof key === 'string' && key.startsWith(`${import.meta.env.VITE_SERVER_URL}/cart`)),
  });
