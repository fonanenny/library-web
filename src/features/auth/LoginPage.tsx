import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '@/lib/axios';
import { setCredentials } from '@/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State untuk isi form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dipanggil saat tombol login diklik
  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      // Kirim ke API: POST /api/auth/login
      const response = await api.post('/auth/login', { email, password });
      // response.data = { token, user }
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
    <div className='flex min-h-screen items-center justify-center bg-neutral-50'>
      <Card className='w-[380px]'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>Masuk ke Library Web</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='admin@library.local'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className='text-sm text-red-500'>{error}</p>}

          <Button onClick={handleLogin} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
