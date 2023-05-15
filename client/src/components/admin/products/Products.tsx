import { Button, Container, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import CreateProductModal from './createProductModal/CreateProductModal';
import Table from './Table';

export default function Products() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container size='xl' py='xl'>
      <Stack>
        <Button leftIcon={<IconPlus />} sx={{ alignSelf: 'end' }} onClick={open}>
          Create product
        </Button>
        <CreateProductModal opened={opened} close={close} />
        <Table />
      </Stack>
    </Container>
  );
}
