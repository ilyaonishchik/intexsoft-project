import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useFilters } from '../../../hooks/swr/filter';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { clearFilters, setFilters, setPrice } from '../../../redux/slices/catalogSlice';
import { Error, Loading } from '../../common';
import PriceFilter from './PriceFilter';
import CheckFilter from './CheckFilter';
import RangeFilter from './RangeFilter';

export default function Filters() {
  const dispatch = useAppDispatch();

  const filters = useAppSelector(state => state.catalog.filters);
  const count = useAppSelector(state => state.catalog.count);

  const { categoryName } = useParams();

  const { error, data } = useFilters(categoryName || '');

  useEffect(() => {
    if (data) {
      dispatch(setPrice(data[0]));
      dispatch(setFilters(data[1]));
    }
  }, [dispatch, data]);

  if (!data) return <Loading />;
  if (error) return <Error />;

  return (
    <Stack w={288} spacing='xs'>
      <PriceFilter />
      {filters.map(filter => {
        switch (filter.type) {
          case 'check':
            return <CheckFilter key={v4()} filter={filter} />;
          case 'range':
            return <RangeFilter key={v4()} filter={filter} />;
          default:
            return null;
        }
      })}
      <Paper p='sm' shadow='sm' radius='md' withBorder sx={{ position: 'sticky', bottom: 10, background: 'white' }}>
        <Group position='apart'>
          <Group spacing='xs'>
            <Text>Found</Text>
            <Text fw={500}>{count} products</Text>
          </Group>
          <Button
            onClick={() => dispatch(clearFilters())}
            variant='outline'
            color='red'
            leftIcon={<IconTrash stroke={1} />}
          >
            Clear
          </Button>
        </Group>
      </Paper>
    </Stack>
  );
}
