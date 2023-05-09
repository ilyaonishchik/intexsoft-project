import { Button, Modal, NumberInput, ScrollArea, SimpleGrid, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { v4 } from 'uuid';
import UploadImageButton from './UploadImageButton';
import ImageCard from './ImageCard';
import CategorySelect from './CategorySelect';

export type FormValues = {
  files: File[];
  categoryId: string;
  price: number;
  quantity: number;
};

type Props = {
  opened: boolean;
  onClose: () => void;
};

export default function CreateProductModal({ opened, onClose }: Props) {
  const form = useForm<FormValues>({
    initialValues: {
      files: [],
      categoryId: '',
      price: 0,
      quantity: 0,
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} title='Create product' scrollAreaComponent={ScrollArea.Autosize}>
      <form onSubmit={form.onSubmit(values => console.log(values))}>
        <Stack>
          <SimpleGrid cols={3}>
            {form.values.files.map((file, index) => (
              <ImageCard key={v4()} file={file} index={index} form={form} />
            ))}
            <UploadImageButton form={form} />
          </SimpleGrid>
          <NumberInput label='Price ($)' min={0} {...form.getInputProps('price')} />
          <NumberInput label='Quantity' min={0} {...form.getInputProps('quantity')} />
          <CategorySelect form={form} />
          <Button type='submit' sx={{ alignSelf: 'end' }}>
            Create
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
