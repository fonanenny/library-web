import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { getBooks } from './booksApi';
import Spinner from '@/components/Spinner';
import ErrorState from '@/components/ErrorState';

const categories = [
  { name: 'Fiction', icon: '/fiction.png' },
  { name: 'Non-Fiction', icon: '/non-fiction.png' },
  { name: 'Self-Improvement', icon: '/selv-improv.png' },
  { name: 'Finance', icon: '/finance.png' },
  { name: 'Science & Technology', icon: '/science.png' },
  { name: 'Education', icon: '/education.png' },
];

export default function HomePage() {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  return (
    <div className='p-8'>
      {/* Banner */}
      <div className='relative mb-8 overflow-hidden rounded-2xl'>
        <img
          src='/welcome.png'
          alt='Welcome to Booky'
          className='w-full object-cover'
        />
        <div className='absolute inset-0 flex items-center justify-center'>
          <h1
            className='text-center text-7xl font-bold text-primary'
            style={{
              WebkitTextStroke: '8px white',
              paintOrder: 'stroke fill',
            }}
          >
            Welcome to
            <br />
            Booky
          </h1>
        </div>
      </div>

      {/* Category */}
      <div className='mb-10 grid grid-cols-3 gap-4 sm:grid-cols-6'>
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to='/books'
            className='flex flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition hover:shadow-md'
          >
            <div className='flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10'>
              <img
                src={cat.icon}
                alt={cat.name}
                className='h-9 w-9 object-contain'
              />
            </div>
            <span className='text-center text-sm text-neutral-950'>
              {cat.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Recommendation */}
      <h2 className='mb-6 text-2xl font-bold text-neutral-950'>
        Recommendation
      </h2>

      {isLoading && <Spinner label='Memuat buku...' />}
      {isError && <ErrorState message='Gagal memuat buku.' />}

      {books && (
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5'>
          {books.slice(0, 10).map((book) => (
            <Link
              to={`/books/${book.id}`}
              key={book.id}
              className='flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 transition hover:shadow-md'
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className='h-48 w-full rounded-md object-cover'
              />
              <h3 className='line-clamp-2 font-semibold text-neutral-950'>
                {book.title}
              </h3>
              <p className='text-sm text-neutral-500'>{book.author?.name}</p>
              <p className='flex items-center gap-1 text-sm text-neutral-950'>
                ⭐ {book.rating}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
