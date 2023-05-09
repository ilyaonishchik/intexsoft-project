import { Outlet } from 'react-router-dom';
import { Container, Group } from '@mantine/core';

export default function AdminLayout() {
  return (
    <div>
      <Container>
        <Group>
          <div>Nav</div>
          <Outlet />
        </Group>
      </Container>
    </div>
  );
}
