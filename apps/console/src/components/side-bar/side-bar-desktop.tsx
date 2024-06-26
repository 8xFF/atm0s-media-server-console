'use client'

import { includes } from 'lodash'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from '@packages/ui/components/index'
import { HomeIcon, NetworkIcon } from '@packages/ui/icons/index'
import { cn } from '@packages/ui/lib/utils'

export const SidebarDesktop = () => {
  const pathname = usePathname()
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="/"
          className="group flex shrink-0 items-center justify-center gap-2 font-semibold text-primary-foreground h-8 w-8 text-base"
        >
          <img src="/logo.svg" alt="" className="rounded border" />
          <span className="sr-only">8xFF</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:text-foreground',
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
              href="/zone/list"
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:text-foreground',
                includes(pathname, '/zone') ? 'text-muted-foreground bg-accent' : 'text-accent-foreground'
              )}
            >
              <NetworkIcon className="h-5 w-5" />
              <span className="sr-only">Zones</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Zones</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}
