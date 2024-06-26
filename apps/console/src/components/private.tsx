'use client'

import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@packages/ui/components/index'
import { LoaderIcon } from '@packages/ui/icons/index'
import { getLocalStorage } from '@packages/ui/lib/storage'

type Props = {
  children: React.ReactNode
}

export const Private: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getLocalStorage('token')
    if (!token) {
      setLoading(true)
      redirect('/login')
    } else {
      setHasAccess(true)
      setLoading(false)
    }
  }, [])

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-screen h-screen">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : hasAccess ? (
        children
      ) : (
        <div className="flex flex-1 items-center justify-center w-screen h-screen">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">You need to login to access this page</h3>
            <p className="text-sm text-muted-foreground">Please login to continue</p>
            <div className="gap-2 flex items-center mt-4">
              <Button variant="outline" onClick={() => router.back()}>
                Go back
              </Button>
              <Button onClick={() => router.push('/login')}>Login</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
