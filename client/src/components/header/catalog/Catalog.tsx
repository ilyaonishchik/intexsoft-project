import { useTranslation } from 'react-i18next';
import { ActionIcon, Box, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useCustomMediaQuery } from '../../../hooks/custom/useCustomMediaQuery';
import Modal from './Modal';

export default function Catalog() {
  const { t } = useTranslation();
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
          {t('catalog')}
        </Button>
      )}
      <Modal opened={opened} close={close} />
    </Box>
  );
}
