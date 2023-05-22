import { Button, Container, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import CreateProductModal from './createProductModal/CreateProductModal';
import Table from './table/Table';

export default function Products() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container size='xl'>
      <Stack>
        <Title>Products</Title>
        <Button leftIcon={<IconPlus />} sx={{ alignSelf: 'end' }} onClick={open}>
          Create product
        </Button>
        <CreateProductModal opened={opened} close={close} />
        <Table />
      </Stack>
    </Container>
  );
}
