import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import PreviewPage from '../pages/PreviewPage';

export const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview/$userId',
  component: PreviewPage,
});
