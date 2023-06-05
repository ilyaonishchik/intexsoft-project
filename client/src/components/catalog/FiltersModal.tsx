import { Center, Modal } from '@mantine/core';
import Filters from './filters/Filters';

type Props = {
  opened: boolean;
  close: () => void;
};

export default function FiltersModal({ opened, close }: Props) {
  return (
    <Modal opened={opened} onClose={close} fullScreen title='Filters'>
      <Center>
        <Filters />
      </Center>
    </Modal>
  );
}
