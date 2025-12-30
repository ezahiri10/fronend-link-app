import { Outlet } from '@tanstack/react-router'
import { useSession } from '../lib/auth'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export default function DashboardLayout() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('DashboardLayout - Session:', session, 'isPending:', isPending)
  }, [session, isPending])

  useEffect(() => {
    if (!isPending && !session?.user) {
      console.log('No session found, redirecting to login')
      navigate({ to: '/login' })
    }
  }, [session, isPending, navigate])

  if (isPending) {
    return <LoadingScreen />
  }

  if (!session?.user) {
    return null
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
