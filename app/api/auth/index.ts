import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/auth/check')
      const data = await response.json()

      if (!data.isAuthenticated) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])
}

export default useAuth
