import { Outlet } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'
import { LoadingScreen } from '../components/ui/LoadingScreen'

export default function DashboardLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
