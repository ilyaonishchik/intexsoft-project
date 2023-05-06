import { Link, useNavigate } from 'react-router-dom';
import { Anchor, Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useAuth } from '../../lib/auth/useAuth';

export default function Form() {
  const { signIn, signUp } = useAuth();
  const [type, toggle] = useToggle(['Sign in', 'Sign up']);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: 'ilyaonishchik@gmail.com',
      password: 'password',
      name: '',
      surname: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 6 }, 'Password must be minimum 6 characters long'),
    },
  });

  const handleSubmit = form.onSubmit(values => {
    if (type === 'Sign in')
      signIn({ email: values.email, password: values.password })
        .then(() => navigate('/'))
        .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }));
    else {
      signUp(values)
        .then(() => navigate('/'))
        .catch((err: Error) => notifications.show({ message: err.message, color: 'red' }));
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput label='Email' required {...form.getInputProps('email')} />
        <PasswordInput label='Password' required {...form.getInputProps('password')} />
        {type === 'Sign up' && (
          <>
            <TextInput label='Name' required {...form.getInputProps('name')} />
            <TextInput label='Surname' required {...form.getInputProps('surname')} />
          </>
        )}
        {type === 'Sign in' && (
          <Anchor size='xs' component={Link} to='/forgot-password'>
            Forgot password?
          </Anchor>
        )}
        <Group position='apart'>
          <Anchor size='xs' onClick={() => toggle()}>
            {type === 'Sign up' ? 'Have an account? Sign in' : "Don't have an account? Sign up"}
          </Anchor>
          <Button type='submit'>{type}</Button>
        </Group>
      </Stack>
    </form>
  );
}
