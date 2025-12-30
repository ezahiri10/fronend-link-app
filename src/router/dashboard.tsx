import { createRoute, redirect } from '@tanstack/react-router';
import { rootRoute } from './root';
import DashboardLayout from '../pages/DashboardLayout';
import { authClient } from '../lib/auth';

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardLayout,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (!session.data) {
      throw redirect({ to: '/login' });
    }
  },
});
