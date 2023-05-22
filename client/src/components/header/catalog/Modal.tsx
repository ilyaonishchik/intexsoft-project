import { Modal as MantineModal, ScrollArea, SimpleGrid } from '@mantine/core';
import { Loading, Error } from '../../common';
import { useCategories } from '../../../hooks/swr/category/useCategories';
import ModalItem from './ModalItem';

type Props = {
  opened: boolean;
  close: () => void;
};

export default function Modal({ opened, close }: Props) {
  const { data: categories, error, isLoading } = useCategories();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <MantineModal opened={opened} onClose={close} scrollAreaComponent={ScrollArea.Autosize} title='Catalog' size='xl'>
      <SimpleGrid
        cols={1}
        breakpoints={[
          { minWidth: 'xs', cols: 2 },
          { minWidth: 'sm', cols: 3 },
        ]}
      >
        {categories
          ?.filter(category => !category.parent)
          .map(category => (
            <ModalItem key={category.id} category={category} close={close} />
          ))}
      </SimpleGrid>
    </MantineModal>
  );
}
