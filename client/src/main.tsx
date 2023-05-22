import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './index.css';
import App from './App.tsx';
import AuthProvider from './lib/auth/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <MantineProvider
      theme={{
        primaryColor: 'cyan',
      }}
      withNormalizeCSS
      withGlobalStyles
    >
      <AuthProvider>
        <Notifications />
        <App />
      </AuthProvider>
    </MantineProvider>
  </BrowserRouter>
);
