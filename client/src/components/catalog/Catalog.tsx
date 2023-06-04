import { useSearchParams } from 'react-router-dom';
import { Container, Group, SimpleGrid, Stack, Title } from '@mantine/core';
import { useProducts } from '../../hooks/swr/product/useProducts';
import { Error, Loading, ProductCard } from '../common';
import { usePagination } from '../../hooks/custom/usePagination';
import { useSorting } from '../../hooks/custom/useSorting';
import Sorting from './Sorting';
import Pagination from './Pagination';
import Filters from './Filters';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId');

  const { sortBy, setSortBy, order, setOrder } = useSorting('price', 'desc');
  const { page, setPage, take, setTake } = usePagination(1, 9);

  const { error, data } = useProducts({
    sorting: { sortBy, order },
    pagination: { skip: (page - 1) * Number(take), take },
    categoryId,
  });
  if (!data) return <Loading />;
  if (error) return <Error />;
  const [products, count] = data;

  return (
    <Container size='xl'>
      <Stack>
        <Title>Catalog</Title>
        <Group position='apart' align='start'>
          <Stack>
            <Sorting
              sortBy={sortBy}
              onSortByChange={value => setSortBy(value!)}
              order={order}
              onOrderChange={value => setOrder(value!)}
            />
            <SimpleGrid cols={3}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
            <Pagination
              total={Math.ceil(count / Number(take))}
              page={page}
              onPageChange={setPage}
              take={take}
              onTakeChange={value => setTake(Number(value))}
            />
          </Stack>
          <Filters />
        </Group>
      </Stack>
    </Container>
  );
}
