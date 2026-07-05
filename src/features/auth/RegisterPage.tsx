import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('Password dan Confirm Password tidak sama.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, phone, password });
      toast.success('Register sukses! Silakan login. 🎉');
      navigate('/login');
    } catch (err) {
      setError('Register gagal. Cek data yang diisi.');
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

        <h1 className='mb-1 text-2xl font-bold text-neutral-950'>Register</h1>
        <p className='mb-6 text-sm text-neutral-500'>
          Create your account to start borrowing books.
        </p>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name' className='text-neutral-950'>
              Name
            </Label>
            <Input
              id='name'
              type='text'
              placeholder='Nama lengkap'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='rounded-lg border-neutral-200 py-5'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='email' className='text-neutral-950'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='email@contoh.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='rounded-lg border-neutral-200 py-5'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='phone' className='text-neutral-950'>
              Nomor Handphone
            </Label>
            <Input
              id='phone'
              type='text'
              placeholder='08xxxxxxxxxx'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='rounded-lg border-neutral-200 py-5'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='password' className='text-neutral-950'>
              Password
            </Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='rounded-lg border-neutral-200 py-5 pr-10'
              />
              <button
                type='button'
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-1/2 -translate-y-1/2'
              >
                <img
                  src='/eye.png'
                  alt='Toggle password'
                  className={`h-5 w-5 ${showPassword ? 'opacity-100' : 'opacity-40'}`}
                />
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='confirmPassword' className='text-neutral-950'>
              Confirm Password
            </Label>
            <div className='relative'>
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='••••••••'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='rounded-lg border-neutral-200 py-5 pr-10'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className='absolute right-3 top-1/2 -translate-y-1/2'
              >
                <img
                  src='/eye.png'
                  alt='Toggle password'
                  className={`h-5 w-5 ${showConfirmPassword ? 'opacity-100' : 'opacity-40'}`}
                />
              </button>
            </div>
          </div>

          {error && <p className='text-sm text-danger'>{error}</p>}

          <Button
            onClick={handleRegister}
            disabled={loading}
            className='mt-2 rounded-full bg-primary py-5 text-white hover:bg-primary/90'
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>

          <p className='text-center text-sm text-neutral-500'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-primary hover:underline'
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
