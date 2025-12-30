import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from './dashboard'
import LinksPage from '../pages/LinksPage'

export const linksRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/links',
  component: LinksPage,
})
