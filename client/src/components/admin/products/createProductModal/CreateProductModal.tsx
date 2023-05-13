import { Button, Modal, NumberInput, ScrollArea, SimpleGrid, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { v4 } from 'uuid';
import UploadImageButton from './UploadImageButton';
import ImageCard from './ImageCard';
import CategorySelect from './CategorySelect';
import { useCreateProduct } from '../../../../hooks/swr/product/useCreateProduct';

export type FormValues = {
  files: File[];
  categoryId: string;
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  opened: boolean;
  close: () => void;
};

export default function CreateProductModal({ opened, close }: Props) {
  const form = useForm<FormValues>({
    initialValues: {
      files: [],
      categoryId: '',
      name: '',
      price: 0,
      quantity: 0,
    },
    validate: {
      files: value => (!value.length ? 'Select at least 1 image' : null),
      categoryId: isNotEmpty('Select category'),
      name: isNotEmpty('Invalid name'),
    },
  });

  const { trigger, isMutating } = useCreateProduct();

  const handleSubmit = form.onSubmit(values => {
    const formData = new FormData();
    values.files.forEach(file => formData.append('images', file));
    formData.append('categoryId', values.categoryId);
    formData.append('name', values.name);
    formData.append('price', String(values.price));
    formData.append('quantity', String(values.quantity));
    trigger({ formData })
      .then(res => {
        console.log(res);
        notifications.show({ message: 'Product successfully created', color: 'green' });
      })
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }))
      .finally(() => close());
  });

  return (
    <Modal opened={opened} onClose={close} title='Create product' scrollAreaComponent={ScrollArea.Autosize}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <SimpleGrid cols={3}>
            {form.values.files.map((file, index) => (
              <ImageCard key={v4()} file={file} index={index} form={form} />
            ))}
            <UploadImageButton form={form} />
          </SimpleGrid>
          <CategorySelect form={form} />
          <TextInput label='Name' {...form.getInputProps('name')} />
          <NumberInput label='Price ($)' min={0} {...form.getInputProps('price')} />
          <NumberInput label='Quantity' min={0} {...form.getInputProps('quantity')} />
          <Button type='submit' sx={{ alignSelf: 'end' }} loading={isMutating}>
            Create
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
