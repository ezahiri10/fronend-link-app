import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '../lib/auth';
import { trpc } from '../lib/trpc';

export function useAuth() {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();
  const [redirectTimeout, setRedirectTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const { data: user, isLoading } = trpc.user.me.useQuery(undefined, {
    retry: false,
    enabled: !!session?.user,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // Clear any existing timeout
    if (redirectTimeout) {
      clearTimeout(redirectTimeout);
    }
    
    // If session check is complete and there's no session, wait a bit before redirecting
    // This gives time for cookies to be read after page reload
    if (!isPending && !session?.user) {
      const timeout = setTimeout(() => {
        navigate({ to: '/login' });
      }, 500);
      setRedirectTimeout(timeout);
    }
    
    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [session, isPending]);

  return { user: user || session?.user, isLoading: isLoading || isPending };
}
