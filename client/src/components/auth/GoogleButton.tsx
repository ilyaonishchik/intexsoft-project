import { Link } from 'react-router-dom';
import { Button, Image } from '@mantine/core';
import googleIcon from '../../assets/google.svg';

export default function GoogleButton() {
  return (
    <Button
      component={Link}
      to={`${import.meta.env.VITE_SERVER_URL}/auth/google`}
      leftIcon={<Image src={googleIcon} width={20} height={20} />}
      variant='outline'
      radius='xl'
    >
      Google
    </Button>
  );
}
