import { createRoute } from '@tanstack/react-router'
import { dashboardRoute } from './dashboard'
import ProfilePage from '../pages/ProfilePage'

export const profileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/profile',
  component: ProfilePage,
})
