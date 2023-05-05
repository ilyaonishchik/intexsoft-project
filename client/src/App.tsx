import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './components/home/Home';
import NotFound from './components/NotFound';
import Auth from './components/auth/Auth';
import Catalog from './components/catalog/Catalog';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='catalog' element={<Catalog />} />
      </Route>
      <Route path='auth' element={<Auth />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
