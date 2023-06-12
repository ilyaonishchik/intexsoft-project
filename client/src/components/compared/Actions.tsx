import { Link } from 'react-router-dom';
import { Button, SegmentedControl, SimpleGrid, Stack } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFilter } from '../../redux/slices/comparedSlice';

export default function Actions() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.compared.filter);
  const activeTab = useAppSelector(state => state.compared.activeTab);

  return (
    <Stack miw={216}>
      <SimpleGrid cols={2}>
        <Button component={Link} to={`/catalog/${activeTab}`} leftIcon={<IconPlus />}>
          Add
        </Button>
        <Button leftIcon={<IconTrash stroke={1} />} color='red' variant='outline'>
          Clear
        </Button>
      </SimpleGrid>
      <SegmentedControl
        data={['All', 'Differences', 'Matches']}
        value={filter}
        onChange={value => dispatch(setFilter(value))}
        orientation='vertical'
        w='100%'
      />
    </Stack>
  );
}
