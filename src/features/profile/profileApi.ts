import { api } from '@/lib/axios';

export interface Profile {
  profile: {
    id: number;
    name: string;
    email: string;
    phone: string;
    profilePhoto: string;
    role: string;
    createdAt: string;
  };
  loanStats: {
    borrowed: number;
    late: number;
    returned: number;
    total: number;
  };
  reviewsCount: number;
}

export async function getProfile(): Promise<Profile> {
  const response = await api.get('/me');
  return response.data.data;
}
