import { ActionIcon } from '@mantine/core';
import { IconChartBar } from '@tabler/icons-react';

export default function ComapredButton() {
  return (
    <ActionIcon size='lg' color='cyan'>
      <IconChartBar stroke={1} />
    </ActionIcon>
  );
}
