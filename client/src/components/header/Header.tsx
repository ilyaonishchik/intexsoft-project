import { Container, Group } from '@mantine/core';
import Search from './Search';
import Nav from './Nav';
import Logo from './Logo';
import Catalog from './catalog/Catalog';
import { useCustomMediaQuery } from '../../hooks/useCustomMediaQuery';

export default function Header() {
  const smallerThanXS = useCustomMediaQuery('smaller', 'xs');
  const largerThanXS = useCustomMediaQuery('larger', 'xs');

  return (
    <header>
      <Container size='xl'>
        <Group position='apart' py='md'>
          {smallerThanXS && <Catalog />}
          <Logo />
          {largerThanXS && (
            <Group>
              <Catalog />
              <Search />
            </Group>
          )}
          <Nav />
        </Group>
      </Container>
    </header>
  );
}
