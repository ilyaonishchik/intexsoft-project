import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './index.css';
import App from './App.tsx';
import AuthProvider from './lib/auth/AuthProvider.tsx';
import './i18n';
import { store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <MantineProvider
      theme={{
        primaryColor: 'cyan',
        headings: {
          sizes: {
            h1: { fontSize: '28px' },
            h2: { fontSize: '24px' },
            h3: { fontSize: '20px' },
            h4: { fontSize: '18px' },
            h5: { fontSize: '16px' },
            h6: { fontSize: '14px' },
          },
        },
      }}
      withNormalizeCSS
      withGlobalStyles
    >
      <AuthProvider>
        <Notifications />
        <Suspense fallback={<Loader />}>
          <Provider store={store}>
            <App />
          </Provider>
        </Suspense>
      </AuthProvider>
    </MantineProvider>
  </BrowserRouter>
);
