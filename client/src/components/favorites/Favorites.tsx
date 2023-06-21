import { Container, Stack, Title } from '@mantine/core';
import { useFavorites } from '../../hooks/swr/favorites';
import { Error, Loading } from '../common';
import Item from './Item';
import Actions from './Actions';

export default function Favorites() {
  const { isLoading, error, data: favorites } = useFavorites();
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  const { products } = favorites!;

  return (
    <Container size='xl'>
      <Stack>
        <Title>Favorites</Title>
        <Actions />
        <Stack>
          {products?.map(product => (
            <Item key={product.id} product={product} />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
