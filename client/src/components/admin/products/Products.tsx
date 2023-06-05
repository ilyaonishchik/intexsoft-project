import { Button, Container, Group, Stack, Table, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import CreateProductModal from './createProductModal/CreateProductModal';
import { useCustomMediaQuery } from '../../../hooks/custom/useCustomMediaQuery';
import { usePagination } from '../../../hooks/custom/usePagination';
import { useSorting } from '../../../hooks/custom/useSorting';
import { useProducts } from '../../../hooks/swr/product/useProducts';
import { Loading, Error, Sorting, Pagination } from '../../common';
import Row from './Row';

export default function Products() {
  const [opened, { open, close }] = useDisclosure(false);

  const largerThanSM = useCustomMediaQuery('larger', 'sm');

  const { page, setPage, take, setTake } = usePagination(1, 20);
  const { sortBy, setSortBy, order, setOrder } = useSorting('updatedAt', 'desc');

  const { error, data } = useProducts({
    pagination: { skip: (page - 1) * Number(take), take },
    sorting: { sortBy, order },
  });

  if (!data) return <Loading />;
  if (error) return <Error />;
  const [products, count] = data;

  return (
    <Container size='xl'>
      <Stack>
        <Title>Products</Title>
        <Group position='apart'>
          <Sorting
            sortBy={sortBy}
            onSortByChange={value => setSortBy(value!)}
            order={order}
            onOrderChange={value => setOrder(value!)}
          />
          <Button leftIcon={<IconPlus />} sx={{ alignSelf: 'end' }} onClick={open}>
            Create product
          </Button>
          <CreateProductModal opened={opened} close={close} />
        </Group>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              {largerThanSM && <th>ID</th>}
              <th>Name</th>
              <th>Price($)</th>
              <th>Quantity</th>
              {largerThanSM && <th>Created</th>}
              {largerThanSM && <th>Updated</th>}
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <Row key={product.id} product={product} />
            ))}
          </tbody>
        </Table>
        <Pagination
          total={Math.ceil(count / Number(take))}
          page={page}
          onPageChange={setPage}
          takeData={['10', '20']}
          take={take}
          onTakeChange={value => setTake(Number(value))}
        />
      </Stack>
    </Container>
  );
}
