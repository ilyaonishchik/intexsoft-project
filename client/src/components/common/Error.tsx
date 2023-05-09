import { Alert } from '@mantine/core';

type Props = {
  message?: string;
};

export default function Error({ message = 'Error' }: Props) {
  return <Alert color='red'>{message}</Alert>;
}
