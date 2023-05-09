import { useEffect, useState } from 'react';
import { ActionIcon, Card, FileButton, Group, Image, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconEdit, IconX } from '@tabler/icons-react';
import { FormValues } from './CreateProductModal';

type Props = {
  file: File | null;
  index: number;
  form: UseFormReturnType<FormValues>;
};

export default function ImageCard({ file, index, form }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    if (file) reader.readAsDataURL(file);
  }, []);

  const handleChange = (payload: File | null) => {
    form.removeListItem('files', index);
    form.insertListItem('files', payload, index);
  };

  return (
    <Card shadow='sm' padding='xs' radius='md' withBorder>
      <Stack>
        <Group position='apart' spacing='xs'>
          <Text>{index + 1}.</Text>
          <Group spacing='xs'>
            <FileButton onChange={handleChange}>
              {props => (
                <ActionIcon {...props} size='xs' color='cyan'>
                  <IconEdit />
                </ActionIcon>
              )}
            </FileButton>
            <ActionIcon onClick={() => form.removeListItem('files', index)} size='xs' color='red'>
              <IconX />
            </ActionIcon>
          </Group>
        </Group>
        <Image src={imageUrl} height={100} fit='contain' />
      </Stack>
    </Card>
  );
}
