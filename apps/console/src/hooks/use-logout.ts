'use client'

import { removeCookie } from '@packages/ui/lib/cookies'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const router = useRouter()

  const onLogout = () => {
    removeCookie('token')
    router.push('/login')
  }

  return { onLogout }
}
