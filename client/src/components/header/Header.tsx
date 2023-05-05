import { Container, Group } from '@mantine/core';
import Search from './Search';
import Nav from './Nav';
import Logo from './Logo';
import Menu from './menu/Menu';

export default function Header() {
  return (
    <header>
      <Container size='xl'>
        <Group py='xs'>
          <Logo />
          <Menu />
          <Search />
          <Nav />
        </Group>
      </Container>
    </header>
  );
}
