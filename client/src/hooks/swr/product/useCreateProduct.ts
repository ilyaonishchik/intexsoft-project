import useSWRMutation from 'swr/mutation';
import { Product } from '../../../types';

const fetcher = async (url: string, { arg }: { arg: { formData: FormData } }) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    body: arg.formData,
  });
  if (!response.ok) throw new Error('Error occured while creating the product');
  const product = (await response.json()) as Product;
  return product;
};

export const useCreateProduct = () => useSWRMutation(`${import.meta.env.VITE_SERVER_URL}/products`, fetcher);
