import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { AuthPage, CatalogPage, HomePage, NotFoundPage } from './pages';
import { useAuth } from './lib/auth/useAuth';

function App() {
  const { me } = useAuth();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='catalog' element={<CatalogPage />} />
      </Route>
      {!me && <Route path='auth' element={<AuthPage />} />}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
