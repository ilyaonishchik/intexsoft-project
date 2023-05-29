import { ActionIcon, Avatar, Group, Paper, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useMe } from '../../../hooks/swr/auth/useMe';
import { Loading, Error } from '../../common';
import EditGeneralModal from './EditGeneralModal';

export default function General() {
  const [opened, { open, close }] = useDisclosure();

  const { error, data: me } = useMe();
  if (!me) return <Loading />;
  if (error) return <Error />;
  const { avatar, name, surname, email } = me;

  return (
    <Paper p='xl' withBorder radius='xl' shadow='sm'>
      <Group position='apart' sx={{ flexWrap: 'nowrap' }}>
        <Group spacing='xl' position='left'>
          <Avatar src={avatar} size='xl' radius='lg' />
          <Stack spacing='xs'>
            <Text size='xl' fw={500}>
              {name} {surname}
            </Text>
            <Text>{email}</Text>
          </Stack>
        </Group>
        <ActionIcon onClick={open} color='cyan' sx={{ alignSelf: 'start' }}>
          <IconEdit stroke={1} />
        </ActionIcon>
        <EditGeneralModal me={me} opened={opened} close={close} />
      </Group>
    </Paper>
  );
}
