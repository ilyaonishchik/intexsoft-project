import { Card, FileButton, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { FormValues } from './CreateProductModal';

type Props = {
  form: UseFormReturnType<FormValues>;
};

export default function UploadImageButton({ form }: Props) {
  return (
    <FileButton onChange={file => form.insertListItem('files', file)}>
      {props => (
        <Card {...props} shadow='sm' padding='xs' radius='md' withBorder sx={{ cursor: 'pointer' }}>
          <Stack>
            <Text>Upload image</Text>
            <IconPlus width='full' height={100} color='#15aabf' />
          </Stack>
        </Card>
      )}
    </FileButton>
  );
}
