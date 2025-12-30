import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '../lib/auth';
import { trpc } from '../lib/trpc';

export function useAuth() {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();
  
  const { data: user, isLoading } = trpc.user.me.useQuery(undefined, {
    retry: false,
    enabled: !!session?.user,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isPending && !session?.user) {
      navigate({ to: '/login' });
    }
  }, [session, isPending, navigate]);

  return { user: user || session?.user, isLoading: isLoading || isPending };
}
