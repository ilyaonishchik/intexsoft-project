import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconChartBar,
  IconChevronDown,
  IconChevronUp,
  IconDeviceAnalytics,
  IconDeviceMobile,
  IconHeart,
  IconLogout,
  IconShoppingCart,
} from '@tabler/icons-react';
import { useCustomMediaQuery } from '../../hooks/useCustomMediaQuery';
import { useAuth } from '../../lib/auth/useAuth';

export default function Nav() {
  const [opened, { toggle }] = useDisclosure(false);
  const smallerThanSM = useCustomMediaQuery('smaller', 'sm');
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
                <Menu.Label>Admin</Menu.Label>
                <Menu.Item icon={<IconDeviceAnalytics stroke='1' />} component={Link} to='/admin/dashboard'>
                  Dashboard
                </Menu.Item>
                <Menu.Item icon={<IconDeviceMobile stroke='1' />} component={Link} to='/admin/products'>
                  Products
                </Menu.Item>
                <Menu.Divider />
              </>
            )}
            <Menu.Item icon={<IconShoppingCart stroke='1' />} component={Link} to='/cart'>
              Cart
            </Menu.Item>
            <Menu.Item icon={<IconHeart stroke='1' />} component={Link} to='/favorites'>
              Favorites
            </Menu.Item>
            <Menu.Item icon={<IconChartBar stroke='1' />} component={Link} to='/compared'>
              Compared
            </Menu.Item>
            <Menu.Item icon={<IconLogout stroke='1' />} onClick={handleSignOut}>
              Sign out
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
