import { Loader2 } from 'lucide-react';

export default function Spinner({ label = 'Memuat...' }: { label?: string }) {
  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center gap-3 text-neutral-500'>
      <Loader2 className='h-8 w-8 animate-spin' />
      <p className='text-sm'>{label}</p>
    </div>
  );
}
