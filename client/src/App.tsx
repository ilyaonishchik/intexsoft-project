import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { useAuth } from './lib/auth/useAuth';
import {
  Auth,
  Cart,
  Catalog,
  Compared,
  Dashboard,
  Favorites,
  Home,
  NotFound,
  Orders,
  Products,
  Profile,
} from './components';

function App() {
  const { me } = useAuth();
  const isAdmin = !!me?.roles.find(role => role.name === 'admin');

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='catalog' element={<Catalog />} />
        {me && (
          <>
            <Route path='cart' element={<Cart />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='compared' element={<Compared />} />
            <Route path='orders' element={<Orders />} />
            <Route path='profile' element={<Profile />} />
          </>
        )}
        {isAdmin && (
          <>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/products' element={<Products />} />
          </>
        )}
      </Route>
      {!me && <Route path='auth' element={<Auth />} />}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
