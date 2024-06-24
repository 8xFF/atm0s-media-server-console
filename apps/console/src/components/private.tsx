'use client'

import { redirect, usePathname, useRouter } from 'next/navigation'
import { Button } from '@packages/ui/components/index'

type Props = {
  hasAccess: boolean
  children: React.ReactNode
}

export const Private: React.FC<Props> = ({ hasAccess, children }) => {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === '/' && !hasAccess) redirect('/login')

  return hasAccess ? (
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
  )
}
