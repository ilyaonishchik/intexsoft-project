import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { AuthPage, CatalogPage, DashboardPage, HomePage, NotFoundPage, ProductsPage } from './pages';
import { useAuth } from './lib/auth/useAuth';

function App() {
  const { me } = useAuth();
  const isAdmin = !!me?.roles.find(role => role.name === 'admin');

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='catalog' element={<CatalogPage />} />
        {isAdmin && (
          <>
            <Route path='/admin/dashboard' element={<DashboardPage />} />
            <Route path='/admin/products' element={<ProductsPage />} />
          </>
        )}
      </Route>
      {!me && <Route path='auth' element={<AuthPage />} />}
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
