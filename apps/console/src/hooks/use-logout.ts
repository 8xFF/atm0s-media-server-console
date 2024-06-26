'use client'

import { useRouter } from 'next/navigation'
import { removeLocalStorage } from '@packages/ui/lib/storage'

export const useLogout = () => {
  const router = useRouter()

  const onLogout = () => {
    removeLocalStorage('token')
    router.push('/login')
  }

  return { onLogout }
}
