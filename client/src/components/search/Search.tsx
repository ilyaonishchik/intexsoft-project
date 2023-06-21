import { Container, Stack, Title } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import Sorting from './Sorting';
import Products from './Products';
import Pagination from './Pagination';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <Container size='xl'>
      <Stack>
        <Title>Search results {`"${query}"`}</Title>
        <Stack>
          <Sorting />
          <Products query={query!} />
          <Pagination />
        </Stack>
      </Stack>
    </Container>
  );
}
