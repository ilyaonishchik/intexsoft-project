import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreateProductModal from './createProductModal/CreateProductModal';

export default function Products() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Button onClick={open}>Create product</Button>
      <CreateProductModal opened={opened} close={close} />
    </div>
  );
}
