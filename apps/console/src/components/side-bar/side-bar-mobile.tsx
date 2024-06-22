'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, Sheet, SheetContent, SheetTrigger } from '@packages/ui/components/index'
import { HomeIcon, NetworkIcon, PanelLeftIcon } from '@packages/ui/icons/index'
import { cn } from '@packages/ui/lib/utils'
import { ChangeTheme } from '@packages/ui/providers/index'

export const SidebarMobile = () => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeftIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <div className="flex flex-col justify-between h-full">
          <nav className="grid gap-4 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:text-base"
            >
              <img src="/logo.svg" alt="" className="rounded border" />
              <span className="sr-only">8xFF</span>
            </Link>
            <Link
              href="/"
              className={cn(
                'flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground',
                pathname === '/' ? 'bg-muted' : ''
              )}
            >
              <HomeIcon className="h-5 w-5" />
              Summary
            </Link>
            <Link
              href="/zones"
              className={cn(
                'flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground',
                pathname === '/zones' ? 'bg-muted' : ''
              )}
            >
              <NetworkIcon className="h-5 w-5" />
              Zones
            </Link>
          </nav>
          <ChangeTheme />
        </div>
      </SheetContent>
    </Sheet>
  )
}
