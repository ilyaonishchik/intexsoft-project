import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { Review } from '../../../types';

type Arg = {
  productId: number;
  rating: number;
  text: string;
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
  if (!response.ok) throw new Error('Error occured while creating the review');
  return (await response.json()) as Review;
};

export const useCreateReview = () =>
  useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/reviews`, fetcher, {
    onSuccess: () =>
      mutate(key => typeof key === 'string' && key.startsWith(`${import.meta.env.VITE_SERVER_URL}/reviews`)),
  });
