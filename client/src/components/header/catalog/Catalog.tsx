import { ActionIcon, Box, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useCustomMediaQuery } from '../../../hooks/useCustomMediaQuery';

export default function Catalog() {
  const smallerThanMD = useCustomMediaQuery('smaller', 'md');
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      {smallerThanMD ? (
        <ActionIcon onClick={open} color='cyan' variant='filled' size='lg'>
          {opened ? <IconX /> : <IconMenu2 />}
        </ActionIcon>
      ) : (
        <Button leftIcon={opened ? <IconX /> : <IconMenu2 />} onClick={open}>
          Catalog
        </Button>
      )}
      <Modal opened={opened} onClose={close} title='Menu'>
        Modal
      </Modal>
    </Box>
  );
}
