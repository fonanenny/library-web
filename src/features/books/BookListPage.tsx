import { useQuery } from '@tanstack/react-query';
import { getBooks } from './booksApi';
import { Link } from 'react-router';

export default function BookListPage() {
  // useQuery: ambil data buku, dengan caching otomatis
  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  if (isLoading) {
    return <div className='p-8 text-center'>Loading buku...</div>;
  }

  if (isError) {
    return (
      <div className='p-8 text-center text-red-500'>Gagal memuat buku.</div>
    );
  }

  return (
    <div className='p-8'>
      <h1 className='mb-6 text-3xl font-bold'>Daftar Buku 📚</h1>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
        {books?.map((book) => (
          <Link
            to={`/books/${book.id}`}
            key={book.id}
            className='flex flex-col gap-2 rounded-lg border p-4 transition hover:shadow-md'
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className='h-48 w-full rounded object-cover'
            />
            <h2 className='font-semibold line-clamp-2'>{book.title}</h2>
            <p className='text-sm text-neutral-500'>{book.author?.name}</p>
            <p className='text-sm'>⭐ {book.rating}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
