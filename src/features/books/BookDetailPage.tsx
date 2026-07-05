import { useParams, Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookById, borrowBook, addReview } from './booksApi';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import Spinner from '@/components/Spinner';
import ErrorState from '@/components/ErrorState';

export default function BookDetailPage() {
  const { id } = useParams();
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
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['book', id] });
    },
    onError: () => {
      toast.error('Gagal menambah review. Pastikan sudah login.');
    },
  });

  if (isLoading) return <Spinner label='Memuat buku...' />;
  if (isError || !book) return <ErrorState message='Gagal memuat buku.' />;

  return (
    <div className='mx-auto max-w-5xl p-8'>
      {/* Breadcrumb */}
      <div className='mb-6 text-sm text-neutral-500'>
        <Link to='/' className='hover:underline'>
          Home
        </Link>
        <span className='mx-2'>{'>'}</span>
        <span>{book.category.name}</span>
        <span className='mx-2'>{'>'}</span>
        <span className='text-neutral-950'>{book.title}</span>
      </div>

      <div className='flex flex-col gap-8 md:flex-row'>
        {/* Cover */}
        <img
          src={book.coverImage}
          alt={book.title}
          className='h-80 w-56 shrink-0 rounded-lg object-cover shadow-md'
        />

        {/* Info */}
        <div className='flex flex-col gap-3'>
          <span className='w-fit rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700'>
            {book.category.name}
          </span>
          <h1 className='text-3xl font-bold text-neutral-950'>{book.title}</h1>
          <p className='text-neutral-500'>{book.author.name}</p>

          <div className='mt-2 flex items-center gap-8'>
            <div>
              <p className='text-lg font-bold text-neutral-950'>
                {book.availableCopies}
              </p>
              <p className='text-xs text-neutral-500'>Stock</p>
            </div>
            <div>
              <p className='text-lg font-bold text-neutral-950'>
                {book.rating}
              </p>
              <p className='text-xs text-neutral-500'>Rating</p>
            </div>
            <div>
              <p className='text-lg font-bold text-neutral-950'>
                {book.reviewCount}
              </p>
              <p className='text-xs text-neutral-500'>Reviews</p>
            </div>
          </div>

          <p className='mt-2 max-w-xl text-sm leading-relaxed text-neutral-700'>
            {book.description}
          </p>

          <div className='mt-4 flex gap-3'>
            <Button
              variant='outline'
              className='rounded-full border-neutral-300 px-6'
            >
              Add to Cart
            </Button>
            <Button
              className='rounded-full bg-primary px-6 text-white hover:bg-primary/90'
              disabled={book.availableCopies === 0 || borrowMutation.isPending}
              onClick={() => borrowMutation.mutate()}
            >
              {borrowMutation.isPending
                ? 'Memproses...'
                : book.availableCopies === 0
                  ? 'Stok habis'
                  : 'Borrow Book'}
            </Button>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className='mt-12 border-t border-neutral-200 pt-8'>
        <h2 className='mb-4 text-xl font-bold text-neutral-950'>Review</h2>
        <p className='mb-6 text-sm text-neutral-700'>
          ⭐ {book.rating} ({book.reviewCount} Ulasan)
        </p>

        {/* Form tambah review */}
        <div className='mb-6 rounded-lg border border-neutral-200 p-4'>
          <p className='mb-2 font-semibold text-neutral-950'>Tulis Review</p>
          <div className='mb-3 flex items-center gap-2'>
            <span className='text-sm text-neutral-700'>Rating:</span>
            <select
              value={star}
              onChange={(e) => setStar(Number(e.target.value))}
              className='rounded border border-neutral-200 px-2 py-1 text-sm'
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
            className='w-full rounded border border-neutral-200 p-2 text-sm'
            rows={3}
          />
          <Button
            className='mt-2 rounded-full bg-primary text-white hover:bg-primary/90'
            size='sm'
            disabled={reviewMutation.isPending || comment.trim() === ''}
            onClick={() => reviewMutation.mutate()}
          >
            {reviewMutation.isPending ? 'Mengirim...' : 'Kirim Review'}
          </Button>
        </div>

        {/* List review */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {book.reviews.map((review) => (
            <div
              key={review.id}
              className='rounded-lg border border-neutral-200 p-4'
            >
              <p className='font-semibold text-neutral-950'>
                {review.user.name}
              </p>
              <p className='text-sm text-warning'>{'⭐'.repeat(review.star)}</p>
              <p className='mt-1 text-sm text-neutral-700'>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
