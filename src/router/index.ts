import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './root';
import { indexRoute } from './index-route';
import { loginRoute } from './login';
import { registerRoute } from './register';
import { dashboardRoute } from './dashboard';
import { linksRoute } from './links';
import { profileRoute } from './profile';
import { previewRoute } from './preview';

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute.addChildren([
    linksRoute,
    profileRoute,
  ]),
  previewRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
