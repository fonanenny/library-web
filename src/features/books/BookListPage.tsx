import { useQuery } from '@tanstack/react-query';
import { getBooks } from './booksApi';
import { Link } from 'react-router';
import Spinner from '@/components/Spinner';
import ErrorState from '@/components/ErrorState';

const categories = [
  'Fiction',
  'Non-fiction',
  'Self-Improve',
  'Finance',
  'Science',
  'Education',
];

const ratings = [5, 4, 3, 2, 1];

export default function BookListPage() {
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  if (isLoading) return <Spinner label='Memuat buku...' />;
  if (isError) return <ErrorState message='Gagal memuat buku.' />;

  return (
    <div className='p-8'>
      <h1 className='mb-6 text-3xl font-bold text-neutral-950'>Book List</h1>

      <div className='flex gap-6'>
        {/* Sidebar Filter */}
        <aside className='w-[220px] shrink-0 rounded-lg border border-neutral-200 p-4'>
          <h2 className='mb-4 text-sm font-bold uppercase text-neutral-950'>
            Filter
          </h2>

          <div className='mb-6'>
            <h3 className='mb-3 text-sm font-semibold text-neutral-950'>
              Category
            </h3>
            <div className='flex flex-col gap-2'>
              {categories.map((cat) => (
                <label
                  key={cat}
                  className='flex items-center gap-2 text-sm text-neutral-700'
                >
                  <input type='checkbox' className='h-4 w-4 accent-primary' />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className='mb-3 text-sm font-semibold text-neutral-950'>
              Rating
            </h3>
            <div className='flex flex-col gap-2'>
              {ratings.map((r) => (
                <label
                  key={r}
                  className='flex items-center gap-2 text-sm text-neutral-700'
                >
                  <input type='checkbox' className='h-4 w-4 accent-primary' />
                  <span className='flex items-center gap-1'>⭐ {r}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid Buku */}
        <div className='grid flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
          {books?.map((book) => (
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
              <h2 className='line-clamp-2 font-semibold text-neutral-950'>
                {book.title}
              </h2>
              <p className='text-sm text-neutral-500'>{book.author?.name}</p>
              <p className='flex items-center gap-1 text-sm text-neutral-950'>
                ⭐ {book.rating}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
