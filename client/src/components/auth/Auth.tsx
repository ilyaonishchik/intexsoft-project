import { Center, Divider, Paper, Stack, Text } from '@mantine/core';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';
import GoogleButton from './GoogleButton';
import Form from './Form';

export default function Auth() {
  const largerThanXS = useCustomMediaQuery('larger', 'xs');

  return (
    <Center h='100%'>
      <Paper w='320px' p='xl' radius='lg' withBorder={largerThanXS} shadow={largerThanXS ? 'md' : ''}>
        <Stack>
          <Text align='center' size='xl' weight='500'>
            Sign in with
          </Text>
          <GoogleButton />
          <Divider label='Or continue with email' labelPosition='center' />
          <Form />
        </Stack>
      </Paper>
    </Center>
  );
}
