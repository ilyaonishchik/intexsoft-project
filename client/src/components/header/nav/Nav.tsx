import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Menu, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconBell,
  IconChartBar,
  IconChevronDown,
  IconChevronUp,
  IconDeviceMobile,
  IconHeart,
  IconLayoutDashboard,
  IconLogout,
  IconReceipt2,
  IconSettings,
  IconUserCircle,
  IconUserShield,
} from '@tabler/icons-react';
import { useCustomMediaQuery } from '../../../hooks/custom/useCustomMediaQuery';
import { useAuth } from '../../../lib/auth/useAuth';
import CartLink from './CartLink';

export default function Nav() {
  const { t } = useTranslation();

  const smallerThanSM = useCustomMediaQuery('smaller', 'sm');

  const [opened, { toggle }] = useDisclosure(false);

  const { me, signOut } = useAuth();
  const isAdmin = !!me?.roles.find(role => role.name === 'admin');

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut()
      .then(() => navigate('/'))
      .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }));
  };

  return (
    <nav>
      {me ? (
        <Menu onOpen={toggle} onClose={toggle}>
          <Menu.Target>
            {smallerThanSM ? (
              <Avatar src={me.avatar} color='cyan'>
                {me.email[0].toUpperCase()}
              </Avatar>
            ) : (
              <Button
                variant='subtle'
                leftIcon={
                  <Avatar src={me.avatar} color='cyan' size='sm'>
                    {me.email[0].toUpperCase()}
                  </Avatar>
                }
                rightIcon={opened ? <IconChevronUp /> : <IconChevronDown />}
              >
                {me.email}
              </Button>
            )}
          </Menu.Target>
          <Menu.Dropdown>
            {isAdmin && (
              <>
                <NavLink label={t('admin')} icon={<IconUserShield stroke='1' />}>
                  <NavLink
                    label={t('dashboard')}
                    icon={<IconLayoutDashboard stroke='1' />}
                    component={Link}
                    to='/admin/dashboard'
                  />
                  <NavLink
                    label={t('products')}
                    icon={<IconDeviceMobile stroke='1' />}
                    component={Link}
                    to='/admin/products'
                  />
                </NavLink>
                <Menu.Divider />
              </>
            )}
            <CartLink />
            <NavLink label={t('favorites')} icon={<IconHeart stroke='1' />} component={Link} to='/favorites' />
            <NavLink label={t('compared')} icon={<IconChartBar stroke='1' />} component={Link} to='/compared' />
            <NavLink label={t('orders')} icon={<IconReceipt2 stroke='1' />} component={Link} to='/orders' />
            <NavLink label={t('profile')} icon={<IconUserCircle stroke='1' />} component={Link} to='/profile' />
            <NavLink label={t('notifications')} icon={<IconBell stroke='1' />} component={Link} to='/notifications' />
            <NavLink label={t('settings')} icon={<IconSettings stroke='1' />} component={Link} to='/settings' />
            <Menu.Divider />
            <Menu.Item icon={<IconLogout stroke='1' />} onClick={handleSignOut} color='red'>
              {t('signOut')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Button component={Link} to='/auth'>
          Sign in
        </Button>
      )}
    </nav>
  );
}
