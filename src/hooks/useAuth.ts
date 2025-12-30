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
    // Only redirect if definitely not authenticated after loading completes
    if (!isPending && !isLoading && !session?.user && !user) {
      const timer = setTimeout(() => {
        navigate({ to: '/login' });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [session, isPending, isLoading, user, navigate]);

  return { user: user || session?.user, isLoading: isLoading || isPending };
}
