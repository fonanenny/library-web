import { AlertCircle } from 'lucide-react';

export default function ErrorState({
  message = 'Terjadi kesalahan. Coba lagi.',
}: {
  message?: string;
}) {
  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center gap-3 text-red-500'>
      <AlertCircle className='h-8 w-8' />
      <p className='text-sm'>{message}</p>
    </div>
  );
}
