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
    <nav className='flex items-center justify-between border-b border-neutral-200 px-8 py-4'>
      <Link to='/' className='flex items-center gap-2'>
        <img src='/logobiru.png' alt='Booky' className='h-8 w-8' />
        <span className='text-xl font-bold text-neutral-950'>Booky</span>
      </Link>

      <div className='relative w-full max-w-md'>
        <input
          type='text'
          placeholder='Search book'
          className='w-full rounded-full border border-neutral-200 py-2 pl-4 pr-4 text-sm outline-none focus:border-primary'
        />
      </div>

      <div className='flex items-center gap-4'>
        {user ? (
          <>
            <Link to='/my-loans' className='text-sm hover:underline'>
              Pinjaman Saya
            </Link>
            <Link to='/profile' className='text-sm hover:underline'>
              Profil
            </Link>

            <img src='/cart.png' alt='Cart' className='h-6 w-6' />

            <div className='flex items-center gap-2'>
              <img
                src='/avatar.png'
                alt={user.name}
                className='h-8 w-8 rounded-full object-cover'
              />
              <span className='text-sm font-medium text-neutral-950'>
                {user.name}
              </span>
              <img src='/blackarrow.png' alt='' className='h-3 w-3' />
            </div>

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
