import { Container, Stack } from '@mantine/core';
import General from './general/General';
import Addresses from './addresses/Addresses';

export default function Profile() {
  return (
    <Container size='xl' mt='xl'>
      <Stack>
        <Stack>
          <General />
          <Addresses />
        </Stack>
      </Stack>
    </Container>
  );
}
