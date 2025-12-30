import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';
import RegisterPage from '../pages/RegisterPage';

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
  beforeLoad: () => {
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      throw redirect({ to: '/dashboard/links' });
    }
  },
});
