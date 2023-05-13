import { Container, SimpleGrid, Stack, Title } from '@mantine/core';
import { useProducts } from '../../hooks/swr/product/useProducts';
import { Loading, Error, ProductCard } from '../common';

export default function New() {
  const { isLoading, error, data: products } = useProducts();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <Container size='xl'>
      <Stack>
        <Title order={2}>New</Title>
        <SimpleGrid cols={4}>
          {products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
