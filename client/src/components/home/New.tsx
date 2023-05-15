import { Container, SimpleGrid, Stack, Title } from '@mantine/core';
import { useProducts } from '../../hooks/swr/product/useProducts';
import { Loading, Error, ProductCard } from '../common';

export default function New() {
  const { error, data } = useProducts({ take: 8 });

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [products] = data;

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
