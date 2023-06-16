import { ActionIcon, Container, Group, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustments } from '@tabler/icons-react';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';
import Sorting from './Sorting';
import Products from './Products';
import Pagination from './Pagination';
import Filters from './filters/Filters';
import FiltersModal from './FiltersModal';

export default function Catalog() {
  const largerThanMD = useCustomMediaQuery('larger', 'md');

  const [opened, { open, close }] = useDisclosure();

  return (
    <Container size='xl'>
      <Stack>
        <Title>Catalog</Title>
        <Group position='apart' align='start' sx={{ flexWrap: 'nowrap' }}>
          <Stack>
            <Group position='apart'>
              <Sorting />
              {!largerThanMD && (
                <>
                  <ActionIcon onClick={open} size='lg' variant='filled' color='cyan' sx={{ alignSelf: 'end' }}>
                    <IconAdjustments stroke={1} />
                  </ActionIcon>
                  <FiltersModal opened={opened} close={close} />
                </>
              )}
            </Group>
            <Products />
            <Pagination />
          </Stack>
          {largerThanMD && <Filters />}
        </Group>
      </Stack>
    </Container>
  );
}
