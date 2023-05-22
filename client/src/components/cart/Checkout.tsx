import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Checkout() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button onClick={open} size='lg' variant='gradient' gradient={{ from: 'cyan.7', to: 'cyan.3' }}>
        Checkout
      </Button>
      <Modal opened={opened} onClose={close} title='Checkout'>
        <form>
          <Stack>
            <TextInput label='Name' />
            <TextInput label='Surname' />
            <TextInput label='Country' />
            <TextInput label='City' />
            <TextInput label='Zip' />
            <TextInput label='Address' />
            <Button sx={{ alignSelf: 'end' }}>Checkout</Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
