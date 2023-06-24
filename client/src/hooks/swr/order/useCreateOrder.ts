import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { NestError } from '../../../types';

type Arg = {
  name: string;
  surname: string;
  addressId: number;
};

const fetcher = async (url: string, { arg }: { arg: Arg }) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  if (!response.ok) {
    const { message } = (await response.json()) as NestError;
    throw new Error(message);
  }
  const confirmationUrl = await response.text();
  return confirmationUrl;
};

export const useCreateOrder = () =>
  useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/orders`, fetcher, {
    onSuccess: () =>
      mutate(key => typeof key === 'string' && key.startsWith(`${import.meta.env.VITE_SERVER_URL}/orders`)),
  });
