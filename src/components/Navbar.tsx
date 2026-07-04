import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import type { RootState } from '@/app/store';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className='flex items-center justify-between border-b px-8 py-4'>
      <Link to='/' className='text-xl font-bold'>
        Library Web 📚
      </Link>

      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <Link to='/my-loans' className='text-sm hover:underline'>
              Pinjaman Saya
            </Link>
            <Link to='/profile' className='text-sm hover:underline'>
              Profil
            </Link>
            <span className='text-sm text-neutral-500'>Hai, {user.name}</span>
            <Button variant='outline' size='sm' onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Link to='/login'>
            <Button size='sm'>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
