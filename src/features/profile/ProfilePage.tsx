import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { getProfile } from './profileApi';
import Spinner from '@/components/Spinner';
import ErrorState from '@/components/ErrorState';

export default function ProfilePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (isLoading) return <Spinner label='Memuat buku...' />;
  if (isError || !data) return <ErrorState message='Gagal memuat profil.' />;

  const { profile, loanStats, reviewsCount } = data;

  return (
    <div className='mx-auto max-w-2xl p-8'>
      <Link to='/' className='text-sm text-blue-600 hover:underline'>
        ← Kembali ke daftar
      </Link>
      <h1 className='mt-4 mb-6 text-3xl font-bold'>Profil Saya 👤</h1>

      {/* Kartu data user */}
      <div className='flex items-center gap-5 rounded-lg border p-6'>
        <img
          src={profile.profilePhoto}
          alt={profile.name}
          className='h-20 w-20 rounded-full object-cover'
        />
        <div>
          <h2 className='text-xl font-bold'>{profile.name}</h2>
          <p className='text-sm text-neutral-500'>{profile.email}</p>
          <p className='text-sm text-neutral-500'>{profile.phone}</p>
          <span className='mt-1 inline-block rounded-full bg-neutral-100 px-2 py-0.5 text-xs'>
            {profile.role}
          </span>
        </div>
      </div>

      {/* Statistik pinjaman */}
      <h3 className='mt-8 mb-3 text-lg font-semibold'>Statistik Pinjaman</h3>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        <StatCard label='Dipinjam' value={loanStats.borrowed} />
        <StatCard label='Terlambat' value={loanStats.late} />
        <StatCard label='Dikembalikan' value={loanStats.returned} />
        <StatCard label='Total' value={loanStats.total} />
      </div>

      <p className='mt-4 text-sm text-neutral-500'>
        Total review yang kamu tulis:{' '}
        <span className='font-semibold'>{reviewsCount}</span>
      </p>
    </div>
  );
}

// Komponen kecil untuk kartu statistik
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className='rounded-lg border p-4 text-center'>
      <p className='text-2xl font-bold'>{value}</p>
      <p className='text-sm text-neutral-500'>{label}</p>
    </div>
  );
}
