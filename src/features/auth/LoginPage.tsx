import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '@/lib/axios';
import { setCredentials } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, Link } from 'react-router';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      dispatch(setCredentials(response.data.data));
      navigate('/');
    } catch (err) {
      setError('Login gagal. Cek email & password.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='w-full max-w-[380px]'>
        <div className='mb-2 flex items-center gap-2'>
          <img src='/logobiru.png' alt='Booky' className='h-8 w-8' />
          <span className='text-xl font-bold text-neutral-950'>Booky</span>
        </div>

        <h1 className='mb-1 text-2xl font-bold text-neutral-950'>Login</h1>
        <p className='mb-6 text-sm text-neutral-500'>
          Masuk ke akun Booky kamu untuk mulai meminjam buku.
        </p>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='email' className='text-neutral-950'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='Masukkan email kamu'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='rounded-lg border-neutral-200 py-5'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='password' className='text-neutral-950'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='Masukkan password kamu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='rounded-lg border-neutral-200 py-5'
            />
          </div>

          {error && <p className='text-sm text-danger'>{error}</p>}

          <Button
            onClick={handleLogin}
            disabled={loading}
            className='mt-2 rounded-full bg-primary py-5 text-white hover:bg-primary/90'
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>

          <p className='text-center text-sm text-neutral-500'>
            Belum punya akun?{' '}
            <Link
              to='/register'
              className='font-medium text-primary hover:underline'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
