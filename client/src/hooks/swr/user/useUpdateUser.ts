import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { User } from '../../../types';

type Arg = Pick<User, 'name' | 'surname'>;

const fetcher = async (url: string, { arg }: { arg: Arg }) => {
  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(arg),
  });
  if (!response.ok) throw new Error('Error occured while updating the user');
  return (await response.json()) as User;
};

export const useUpdateUser = () =>
  useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/users`, fetcher, {
    onSuccess: () =>
      mutate(key => typeof key === 'string' && key.startsWith(`${import.meta.env.VITE_SERVER_URL}/auth/me`)),
  });
