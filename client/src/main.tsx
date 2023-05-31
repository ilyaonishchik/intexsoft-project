import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './index.css';
import App from './App.tsx';
import AuthProvider from './lib/auth/AuthProvider.tsx';
import './i18n';

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
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </AuthProvider>
    </MantineProvider>
  </BrowserRouter>
);
