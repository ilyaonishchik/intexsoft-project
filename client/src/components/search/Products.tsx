import { useEffect } from 'react';
import { Center, SimpleGrid } from '@mantine/core';
import { useProducts } from '../../hooks/swr/product';
import { setCount } from '../../redux/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Error, Loading, ProductCard } from '../common';

type Props = {
  query: string;
};

export default function Products({ query }: Props) {
  const dispatch = useAppDispatch();
  const { page, take, sortBy, order } = useAppSelector(state => state.search);

  const { isLoading, error, data } = useProducts({
    sorting: { sortBy, order },
    pagination: { skip: (page - 1) * Number(take), take },
    query,
  });

  useEffect(() => {
    if (data) {
      const [, count] = data;
      dispatch(setCount(count));
    }
  }, [data, dispatch]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  const [products] = data!;

  return (
    <Center>
      <SimpleGrid cols={4}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Center>
  );
}
