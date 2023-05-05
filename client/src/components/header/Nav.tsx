import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';

export default function Nav() {
  return (
    <nav>
      <Button component={Link} to='/auth'>
        Sign in
      </Button>
    </nav>
  );
}
