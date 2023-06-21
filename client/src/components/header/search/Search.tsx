import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Popover, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedState } from '@mantine/hooks';
import Dropdown from './Dropdown';

export default function Search() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [query, setQuery] = useDebouncedState('', 200);

  const handleNavigate = () => {
    navigate(`/search?query=${query}`);
  };

  return (
    <Popover>
      <Popover.Target>
        <TextInput
          onChange={e => setQuery(e.currentTarget.value)}
          placeholder={t('search') || 'Search'}
          variant='filled'
          rightSection={
            <ActionIcon disabled={!query} onClick={handleNavigate} variant='filled' color='cyan'>
              <IconSearch size='1rem' />
            </ActionIcon>
          }
        />
      </Popover.Target>
      <Dropdown query={query} />
    </Popover>
  );
}
