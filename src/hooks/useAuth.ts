import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSession } from '../lib/auth';
import { trpc } from '../lib/trpc';

export function useAuth() {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();
  const [hasChecked, setHasChecked] = useState(false);
  
  const { data: user, isLoading } = trpc.user.me.useQuery(undefined, {
    retry: false,
    enabled: !!session?.user,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    // Wait for initial session check to complete
    if (!isPending && !hasChecked) {
      setHasChecked(true);
    }
    
    // Only redirect after we've confirmed no session exists
    if (hasChecked && !isPending && !session?.user) {
      navigate({ to: '/login' });
    }
  }, [session, isPending, hasChecked, navigate]);

  return { user: user || session?.user, isLoading: isLoading || isPending || !hasChecked };
}
