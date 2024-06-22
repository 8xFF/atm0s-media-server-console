'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from '@packages/ui/components/index'
import { HomeIcon, NetworkIcon } from '@packages/ui/icons/index'
import { cn } from '@packages/ui/lib/utils'
import { ChangeTheme } from '@packages/ui/providers/index'

export const SidebarDesktop = () => {
  const pathname = usePathname()
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <img src="/logo.svg" alt="" className="rounded border" />
          <span className="sr-only">8xFF</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                pathname === '/' ? 'text-muted-foreground bg-accent' : 'text-accent-foreground'
              )}
            >
              <HomeIcon className="h-5 w-5" />
              <span className="sr-only">Summary</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Summary</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/zones"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8',
                pathname === '/zones' ? 'text-muted-foreground bg-accent' : 'text-accent-foreground'
              )}
            >
              <NetworkIcon className="h-5 w-5" />
              <span className="sr-only">Zones</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Zones</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <ChangeTheme />
      </nav>
    </aside>
  )
}
