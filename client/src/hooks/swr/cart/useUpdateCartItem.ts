import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { CartItem } from '../../../types';

type Arg = {
  quantity: number;
};

const fetcher = async (url: string, { arg }: { arg: Arg }) => {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  if (!response.ok) throw new Error('Error occured while updating the cart item');
  return (await response.json()) as CartItem;
};

export const useUpdateCartItem = (cartItemId: number) =>
  useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/cart/${cartItemId}`, fetcher, {
    onSuccess: () =>
      mutate(key => typeof key === 'string' && key.startsWith(`${import.meta.env.VITE_SERVER_URL}/cart`)),
  });
