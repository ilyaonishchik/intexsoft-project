import { Center, SimpleGrid } from '@mantine/core';
import { Product } from '../../types';
import { ProductCard } from '../common';

type Props = {
  products: Product[];
};

export default function Products({ products }: Props) {
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
