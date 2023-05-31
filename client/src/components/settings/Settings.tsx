import { useTranslation } from 'react-i18next';
import { Container, Stack, Title } from '@mantine/core';
import Localization from './Localization';

export default function Settings() {
  const { t } = useTranslation();
  return (
    <Container size='xl'>
      <Stack>
        <Title>{t('settings')}</Title>
        <Localization />
      </Stack>
    </Container>
  );
}
