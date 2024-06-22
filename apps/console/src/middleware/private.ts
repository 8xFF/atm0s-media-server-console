import { cookies } from 'next/headers'

export const checkAuth = () => {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')?.value

  let hasAccess = false

  if (token) {
    hasAccess = true
  }

  return {
    hasAccess,
  }
}
