import useSWR from 'swr';
import { Order, OrderStatus, PaginationArgs } from '../../../types';
import { generateUrl } from '../../../utils/url/generateUrl';
import { convertArgsToParams } from '../../../utils/url/convertArgsToParams';

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('An error occurred while fetching orders.');
  return (await response.json()) as [Order[], number];
};

// type Args = Partial<PaginationArgs>;

// export const useOrders = ({ skip = 0, take = 10 }: Args) => {
//   return useSWR<[Order[], number], Error>(
//     `${import.meta.env.VITE_SERVER_URL}/orders?skip=${skip}&take=${take}`,
//     fetcher
//   );
// };

//-------------------------

type Args = Partial<PaginationArgs> & {
  status?: OrderStatus;
};

export const useOrders = (args: Args) => {
  const params = convertArgsToParams(args);
  const url = generateUrl(`${import.meta.env.VITE_SERVER_URL}/orders`, params);

  return useSWR<[Order[], number], Error>(url, fetcher);
};
