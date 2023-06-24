import { Center, Container, Text } from '@mantine/core';

export default function Footer() {
  return (
    <footer>
      <Container size='xl' py='lg'>
        <Center>
          <Text size='xs' color='cyan'>
            © 2023 Verditer. All rights reserved.
          </Text>
        </Center>
      </Container>
    </footer>
  );
}
