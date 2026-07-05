import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import { getMyLoans, returnBook } from '@/features/books/booksApi';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import ErrorState from '@/components/ErrorState';

// Ubah tanggal ISO jadi format enak dibaca (misal "11 Jul 2026")
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function MyLoansPage() {
  const {
    data: loans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['myLoans'],
    queryFn: getMyLoans,
  });

  const queryClient = useQueryClient();

  const returnMutation = useMutation({
    mutationFn: (loanId: number) => returnBook(loanId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myLoans'] });
    },
    onError: () => {
      toast.error('Gagal mengembalikan buku.');
    },
  });

  if (isLoading) return <Spinner label='Memuat buku...' />;
  if (isError) return <ErrorState message='Gagal memuat buku.' />;

  return (
    <div className='mx-auto max-w-4xl p-8'>
      <Link to='/' className='text-sm text-blue-600 hover:underline'>
        ← Kembali ke daftar
      </Link>
      <h1 className='mt-4 mb-6 text-3xl font-bold'>Pinjaman Saya 📋</h1>

      {loans && loans.length === 0 && (
        <p className='text-neutral-500'>Belum ada pinjaman.</p>
      )}

      <div className='flex flex-col gap-4'>
        {loans?.map((loan) => (
          <div key={loan.id} className='flex gap-4 rounded-lg border p-4'>
            <img
              src={loan.book.coverImage}
              alt={loan.book.title}
              className='h-28 w-20 shrink-0 rounded object-cover'
            />
            <div className='flex flex-1 flex-col gap-1'>
              <h2 className='font-semibold'>{loan.book.title}</h2>
              <p className='text-sm text-neutral-500'>
                {loan.book.author.name}
              </p>
              <p className='text-sm'>
                Dipinjam: {formatDate(loan.borrowedAt)} · Jatuh tempo:{' '}
                {formatDate(loan.dueAt)}
              </p>
              <span
                className={`mt-1 w-fit rounded-full px-3 py-1 text-xs font-medium ${
                  loan.status === 'BORROWED'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {loan.displayStatus}
              </span>

              {loan.status === 'BORROWED' && (
                <button
                  onClick={() => returnMutation.mutate(loan.id)}
                  disabled={returnMutation.isPending}
                  className='mt-2 w-fit rounded border px-3 py-1 text-xs hover:bg-neutral-50'
                >
                  {returnMutation.isPending
                    ? 'Memproses...'
                    : 'Kembalikan Buku'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
