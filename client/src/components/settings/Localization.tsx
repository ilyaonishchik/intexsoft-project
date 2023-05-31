import { Group, Select, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export default function Localization() {
  const { t, i18n } = useTranslation();

  return (
    <Group>
      <Text>{t('localization')}</Text>
      <Select
        data={['en', 'ru']}
        defaultValue={i18n.language}
        onChange={value => i18n.changeLanguage(value!)}
        maw={70}
      />
    </Group>
  );
}
