import { Link } from 'react-router-dom';
import { Group, Image, Loader, Paper, Popover, Stack, Text } from '@mantine/core';
import { useProducts } from '../../../hooks/swr/product';
import { Error } from '../../common';

type Props = {
  query: string;
};

export default function Dropdown({ query }: Props) {
  const { isLoading, error, data } = useProducts({ query, pagination: { skip: 0, take: 5 } });
  if (isLoading)
    return (
      <Popover.Dropdown>
        <Loader />
      </Popover.Dropdown>
    );
  if (error) return <Error />;
  const [products] = data!;
  if (!products.length)
    return (
      <Popover.Dropdown>
        <Text>No results</Text>
      </Popover.Dropdown>
    );

  return (
    <Popover.Dropdown>
      <Stack spacing='lg'>
        {products.map(({ id, name, images }) => (
          <Paper key={id} component={Link} to={`/products/${id}`}>
            <Group>
              {!!images?.length && (
                <Image
                  src={`${import.meta.env.VITE_SERVER_URL}/${
                    images.sort((a, b) => a.ordinal - b.ordinal)[0].image.name
                  }`}
                  height={50}
                  width={50}
                  fit='contain'
                />
              )}
              <Text>{name}</Text>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Popover.Dropdown>
  );
}
