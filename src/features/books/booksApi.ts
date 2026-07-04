import { api } from '@/lib/axios';

// Bentuk satu buku (yang kita pakai)
export interface Book {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  availableCopies: number;
  author: { id: number; name: string };
  category: { id: number; name: string };
}

// Fungsi ambil daftar buku dari API
export async function getBooks(): Promise<Book[]> {
  const response = await api.get('/books');
  // data buku ada di response.data.data.books
  return response.data.data.books;
}

// Bentuk review
export interface Review {
  id: number;
  star: number;
  comment: string;
  user: { id: number; name: string };
}

// Bentuk detail buku (lebih lengkap dari list)
export interface BookDetail {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  publishedYear: number;
  isbn: string;
  author: { id: number; name: string; bio: string };
  category: { id: number; name: string };
  reviews: Review[];
}

// Bentuk satu pinjaman
export interface Loan {
  id: number;
  status: string;
  displayStatus: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  book: {
    id: number;
    title: string;
    coverImage: string;
    author: { name: string };
  };
}

// Ambil 1 buku by id
export async function getBookById(id: string): Promise<BookDetail> {
  const response = await api.get(`/books/${id}`);
  return response.data.data; // data buku ada di response.data.data
}

// Pinjam buku: POST /api/loans
export async function borrowBook(bookId: number): Promise<void> {
  await api.post('/loans', { bookId, days: 7 });
}

// Ambil daftar pinjaman user: GET /api/loans/my
export async function getMyLoans(): Promise<Loan[]> {
  const response = await api.get('/loans/my');
  return response.data.data.loans ?? response.data.data;
}

// Tambah review: POST /api/reviews
export async function addReview(
  bookId: number,
  star: number,
  comment: string
): Promise<void> {
  await api.post('/reviews', { bookId, star, comment });
}

// Kembalikan buku: PATCH /api/loans/{id}/return
export async function returnBook(loanId: number): Promise<void> {
  await api.patch(`/loans/${loanId}/return`);
}
