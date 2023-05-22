import { Outlet, useNavigate } from 'react-router-dom';
import { ActionIcon, Button, Container, Drawer, Group, SegmentedControl, Stack } from '@mantine/core';
import { IconToggleLeft } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useCustomMediaQuery } from '../hooks/custom/useCustomMediaQuery';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const largerThanXS = useCustomMediaQuery('larger', 'xs');

  const handleNavigate = (path: string) => {
    close();
    navigate(path);
  };

  return (
    <Container size='xl'>
      {largerThanXS ? (
        <Group>
          <SegmentedControl
            data={[
              { label: 'Dashboard', value: '/admin' },
              { label: 'Products', value: '/admin/products' },
              { label: 'Users', value: '/admin/users' },
            ]}
            onChange={value => navigate(value)}
            orientation='vertical'
            size='md'
            color='cyan'
            styles={() => ({
              root: {
                alignSelf: 'start',
              },
              label: {
                textAlign: 'start',
              },
            })}
          />
          <Outlet />
        </Group>
      ) : (
        <Stack spacing='xs'>
          <ActionIcon color='cyan'>
            <IconToggleLeft onClick={open} />
          </ActionIcon>
          <Drawer position='left' opened={opened} onClose={close} withCloseButton={false} size='auto'>
            <Stack>
              <Button onClick={() => handleNavigate('/admin')}>Dashboard</Button>
              <Button onClick={() => handleNavigate('/admin/products')}>Products</Button>
              <Button onClick={() => handleNavigate('/admin/users')}>Users</Button>
            </Stack>
          </Drawer>
          <Outlet />
        </Stack>
      )}
    </Container>
  );
}
