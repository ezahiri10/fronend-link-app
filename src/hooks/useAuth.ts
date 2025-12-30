import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '../lib/auth';
import { trpc } from '../lib/trpc';

export function useAuth() {
  const navigate = useNavigate();
  const { data: session, isPending, error } = useSession();
  
  const { data: user, isLoading } = trpc.user.me.useQuery(undefined, {
    retry: false,
    enabled: !!session?.user,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // Only redirect if session check is complete AND there's no session
    // Don't redirect while still loading
    if (!isPending && !session?.user && error) {
      navigate({ to: '/login' });
    }
  }, [session, isPending, error, navigate]);

  return { user: user || session?.user, isLoading: isLoading || isPending };
}
