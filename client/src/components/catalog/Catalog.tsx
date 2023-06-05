import { useParams } from 'react-router-dom';
import { ActionIcon, Center, Container, Group, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustments } from '@tabler/icons-react';
import { useProducts } from '../../hooks/swr/product/useProducts';
import { Error, Loading } from '../common';
import { usePagination } from '../../hooks/custom/usePagination';
import { useSorting } from '../../hooks/custom/useSorting';
import Sorting from './Sorting';
import Products from './Products';
import Pagination from './Pagination';
import Filters from './filters/Filters';
import FiltersModal from './FiltersModal';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';
import { useAppSelector } from '../../redux/hooks';

export default function Catalog() {
  const largerThanMD = useCustomMediaQuery('larger', 'md');

  const { categoryName } = useParams();
  const { sortBy, setSortBy, order, setOrder } = useSorting('price', 'desc');
  const { page, setPage, take, setTake } = usePagination(1, 9);
  const { from, to } = useAppSelector(state => state.catalog.price);

  const [opened, { open, close }] = useDisclosure();

  const { error, data } = useProducts({
    sorting: { sortBy, order },
    pagination: { skip: (page - 1) * Number(take), take },
    categoryName,
    price: { minPrice: from, maxPrice: to },
  });
  if (!data) return <Loading />;
  if (error) return <Error />;
  const [products, count] = data;

  return (
    <Container size='xl'>
      <Stack>
        <Title>Catalog</Title>
        <Group position='apart' align='start' sx={{ flexWrap: 'nowrap' }}>
          <Center sx={{ flex: 'auto' }}>
            <Stack>
              <Group position='apart'>
                <Sorting
                  sortBy={sortBy}
                  onSortByChange={value => setSortBy(value!)}
                  order={order}
                  onOrderChange={value => setOrder(value!)}
                />
                {!largerThanMD && (
                  <>
                    <ActionIcon onClick={open} size='lg' variant='filled' color='cyan' sx={{ alignSelf: 'end' }}>
                      <IconAdjustments stroke={1} />
                    </ActionIcon>
                    <FiltersModal opened={opened} close={close} />
                  </>
                )}
              </Group>
              <Products products={products} />
              <Pagination
                total={Math.ceil(count / Number(take))}
                page={page}
                onPageChange={setPage}
                take={take}
                onTakeChange={value => setTake(Number(value))}
              />
            </Stack>
          </Center>
          {largerThanMD && <Filters />}
        </Group>
      </Stack>
    </Container>
  );
}
