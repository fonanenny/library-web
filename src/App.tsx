import { Routes, Route, useLocation } from 'react-router';
import LoginPage from '@/features/auth/LoginPage';
import RegisterPage from '@/features/auth/RegisterPage';
import BookListPage from '@/features/books/BookListPage';
import BookDetailPage from '@/features/books/BookDetailPage';
import MyLoansPage from '@/features/loans/MyLoansPage';
import Navbar from '@/components/Navbar';
import ProfilePage from '@/features/profile/ProfilePage';

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
        <Route path='/' element={<BookListPage />} />
        <Route path='/books/:id' element={<BookDetailPage />} />
        <Route path='/my-loans' element={<MyLoansPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
