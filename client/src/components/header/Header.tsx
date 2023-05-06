import { Container, Group } from '@mantine/core';
import Search from './Search';
import Nav from './Nav';
import Logo from './Logo';
import Menu from './menu/Menu';
import { useCustomMediaQuery } from '../../hooks/useCustomMediaQuery';

export default function Header() {
  const smallerThanXS = useCustomMediaQuery('smaller', 'xs');
  const largerThanXS = useCustomMediaQuery('larger', 'xs');

  return (
    <header>
      <Container size='xl'>
        <Group position='apart' py='xs'>
          {smallerThanXS && <Menu />}
          <Logo />
          {largerThanXS && (
            <Group>
              <Menu />
              <Search />
            </Group>
          )}
          <Nav />
        </Group>
      </Container>
    </header>
  );
}
