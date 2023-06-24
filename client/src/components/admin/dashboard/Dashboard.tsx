import { Container, Title } from '@mantine/core';
import Orders from './Orders';

export default function Dashboard() {
  return (
    <Container size='xl'>
      <Title>Dashboard</Title>
      <Orders />
    </Container>
  );
}
