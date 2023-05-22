import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconChartBar,
  IconChevronDown,
  IconChevronUp,
  IconDeviceMobile,
  IconHeart,
  IconLayoutDashboard,
  IconLogout,
  IconReceipt2,
  IconShoppingCart,
  IconUserShield,
} from '@tabler/icons-react';
import { useCustomMediaQuery } from '../../hooks/custom/useCustomMediaQuery';
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
                <NavLink label='Admin' icon={<IconUserShield stroke='1' />}>
                  <NavLink
                    label='Dashboard'
                    icon={<IconLayoutDashboard stroke='1' />}
                    component={Link}
                    to='/admin/dashboard'
                  />
                  <NavLink
                    label='Products'
                    icon={<IconDeviceMobile stroke='1' />}
                    component={Link}
                    to='/admin/products'
                  />
                </NavLink>
                <Menu.Divider />
              </>
            )}
            <NavLink label='Cart' icon={<IconShoppingCart stroke='1' />} component={Link} to='/cart' />
            <NavLink label='Favorites' icon={<IconHeart stroke='1' />} component={Link} to='/favorites' />
            <NavLink label='Compared' icon={<IconChartBar stroke='1' />} component={Link} to='/compared' />
            <NavLink label='Orders' icon={<IconReceipt2 stroke='1' />} component={Link} to='/orders' />
            <Menu.Divider />
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
