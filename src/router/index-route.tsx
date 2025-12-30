import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    const sessionId = localStorage.getItem('sessionId');

    if (sessionId) {
      throw redirect({ to: '/dashboard/links' });
    } else {
      throw redirect({ to: '/login' });
    }
  },
});
