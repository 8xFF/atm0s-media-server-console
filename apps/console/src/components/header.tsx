'use client'

import { SidebarMobile } from '.'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@packages/ui/components/index'
import { GithubIcon, UserIcon } from '@packages/ui/icons/index'
import { ChangeTheme } from '@packages/ui/providers/index'
import { useLogout } from '@/hooks'

type Props = {
  title: string
}

export const Header: React.FC<Props> = ({ title }) => {
  const { onLogout } = useLogout()
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <SidebarMobile />
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        /> */}
      </div>
      <div className="flex items-center gap-2">
        <ChangeTheme />
        <Button variant="ghost" size="icon">
          <GithubIcon size={16} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="overflow-hidden rounded-full">
              <UserIcon size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
