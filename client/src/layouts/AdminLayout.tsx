import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Group, SegmentedControl } from '@mantine/core';

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <Container size='xl'>
      <Group>
        <SegmentedControl
          data={[
            { label: 'Dashboard', value: '/admin' },
            { label: 'Products', value: '/admin/products' },
          ]}
          onChange={value => navigate(value)}
          orientation='vertical'
          size='md'
          color='cyan'
        />
        <Outlet />
      </Group>
    </Container>
  );
}
