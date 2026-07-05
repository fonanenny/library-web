import { Routes, Route, useLocation } from 'react-router';
import LoginPage from '@/features/auth/LoginPage';
import RegisterPage from '@/features/auth/RegisterPage';
import BookDetailPage from '@/features/books/BookDetailPage';
import MyLoansPage from '@/features/loans/MyLoansPage';
import Navbar from '@/components/Navbar';
import ProfilePage from '@/features/profile/ProfilePage';
import { Toaster } from '@/components/ui/sonner';
import HomePage from '@/features/books/HomePage';

function App() {
  const location = useLocation();
  // Sembunyikan navbar di halaman login & register
  const hideNavbar =
    location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/books/:id' element={<BookDetailPage />} />
        <Route path='/my-loans' element={<MyLoansPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      <Toaster richColors position='top-center' />
    </>
  );
}

export default App;
