import { useParams, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookById, borrowBook, addReview } from './booksApi';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import ErrorState from '@/components/ErrorState';

export default function BookDetailPage() {
  const { id } = useParams(); // ambil id dari URL
  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getBookById(id!),
  });

  const borrowMutation = useMutation({
    mutationFn: () => borrowBook(book!.id),
    onSuccess: () => {
      toast.success('Berhasil pinjam buku! 🎉');
      queryClient.invalidateQueries({ queryKey: ['book', id] });
    },
    onError: () => {
      toast.error('Gagal pinjam. Pastikan sudah login & stok tersedia.');
    },
  });

  const [star, setStar] = useState(5);
  const [comment, setComment] = useState('');

  const reviewMutation = useMutation({
    mutationFn: () => addReview(book!.id, star, comment),
    onSuccess: () => {
      setComment(''); // kosongkan form
      queryClient.invalidateQueries({ queryKey: ['book', id] }); // refresh review
    },
    onError: () => {
      toast.error('Gagal menambah review. Pastikan sudah login.');
    },
  });

  if (isLoading) return <Spinner label='Memuat buku...' />;
  if (isError) return <ErrorState message='Gagal memuat buku.' />;

  return (
    <div className='mx-auto max-w-4xl p-8'>
      <Link to='/' className='text-sm text-blue-600 hover:underline'>
        ← Kembali ke daftar
      </Link>

      <div className='mt-6 flex flex-col gap-6 md:flex-row'>
        {/* Cover */}
        <img
          src={book.coverImage}
          alt={book.title}
          className='h-80 w-56 shrink-0 rounded-lg object-cover'
        />

        {/* Info */}
        <div className='flex flex-col gap-3'>
          <span className='w-fit rounded bg-neutral-100 px-2 py-1 text-xs'>
            {book.category.name}
          </span>
          <h1 className='text-3xl font-bold'>{book.title}</h1>
          <p className='text-neutral-600'>oleh {book.author.name}</p>
          <p className='text-sm'>
            ⭐ {book.rating} ({book.reviewCount} review)
          </p>
          <p className='text-sm'>
            Stok tersedia:{' '}
            <span className='font-semibold'>{book.availableCopies}</span> /{' '}
            {book.totalCopies}
          </p>
          <p className='mt-2 text-neutral-700'>{book.description}</p>

          <Button
            className='mt-4 w-fit'
            disabled={book.availableCopies === 0 || borrowMutation.isPending}
            onClick={() => borrowMutation.mutate()}
          >
            {borrowMutation.isPending
              ? 'Memproses...'
              : book.availableCopies === 0
                ? 'Stok habis'
                : 'Pinjam Buku'}
          </Button>
        </div>
      </div>

      {/* Review */}
      <div className='mt-10'>
        <h2 className='text-xl font-bold'>Review ({book.reviews.length})</h2>
        {/* Form tambah review */}
        <div className='mt-4 rounded-lg border p-4'>
          <p className='mb-2 font-semibold'>Tulis Review</p>
          <div className='mb-3 flex items-center gap-2'>
            <span className='text-sm'>Rating:</span>
            <select
              value={star}
              onChange={(e) => setStar(Number(e.target.value))}
              className='rounded border px-2 py-1 text-sm'
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} ⭐
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Bagaimana pendapatmu tentang buku ini?'
            className='w-full rounded border p-2 text-sm'
            rows={3}
          />
          <Button
            className='mt-2'
            size='sm'
            disabled={reviewMutation.isPending || comment.trim() === ''}
            onClick={() => reviewMutation.mutate()}
          >
            {reviewMutation.isPending ? 'Mengirim...' : 'Kirim Review'}
          </Button>
        </div>
        <div className='mt-4 flex flex-col gap-4'>
          {book.reviews.map((review) => (
            <div key={review.id} className='rounded-lg border p-4'>
              <p className='font-semibold'>{review.user.name}</p>
              <p className='text-sm text-yellow-600'>
                {'⭐'.repeat(review.star)}
              </p>
              <p className='mt-1 text-neutral-700'>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
