import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Center, SimpleGrid } from '@mantine/core';
import { Loading, Error, ProductCard } from '../common';
import { useProducts } from '../../hooks/swr/product';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setCount } from '../../redux/slices/catalogSlice';

export default function Products() {
  const dispatch = useAppDispatch();

  const { categoryName } = useParams();

  const { page, take, sortBy, order, price } = useAppSelector(state => state.catalog);

  const { error, data } = useProducts({
    sorting: { sortBy, order },
    pagination: { skip: (page - 1) * Number(take), take },
    categoryName,
    price: { minPrice: price.from, maxPrice: price.to },
  });

  useEffect(() => {
    if (data) {
      const [, count] = data;
      dispatch(setCount(count));
    }
  }, [data, dispatch]);

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [products] = data;

  return (
    <Center>
      <SimpleGrid
        cols={1}
        breakpoints={[
          { minWidth: 'sm', cols: 2 },
          { minWidth: 'lg', cols: 3 },
        ]}
        spacing='xl'
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Center>
  );
}
