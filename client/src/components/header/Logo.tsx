import { Link } from 'react-router-dom';
import { Group, Image, Text } from '@mantine/core';
import sparrowIcon from '../../assets/sparrow.svg';

export default function Logo() {
  return (
    <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
      <Group spacing='xs'>
        <Image src={sparrowIcon} width={30} height={30} />
        <Text c='cyan' fw={900} fs='italic' tt='uppercase'>
          Verditer
        </Text>
      </Group>
    </Link>
  );
}
