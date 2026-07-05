import { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');
    setLoading(true);
    try {
      // Kirim ke API: POST /api/auth/register
      await api.post('/auth/register', { name, email, phone, password });
      toast.success('Register sukses! Silakan login. 🎉');
      navigate('/login'); // setelah daftar, pindah ke login
    } catch (err) {
      setError('Register gagal. Cek data yang diisi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-neutral-50'>
      <Card className='w-[380px]'>
        <CardHeader>
          <CardTitle className='text-2xl'>Register</CardTitle>
          <CardDescription>Buat akun Library Web</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Nama</Label>
            <Input
              id='name'
              type='text'
              placeholder='Nama lengkap'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='email@contoh.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='phone'>No. HP</Label>
            <Input
              id='phone'
              type='text'
              placeholder='08xxxxxxxxxx'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <Button onClick={handleRegister} disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
