'use client'

import { Header, SidebarDesktop } from '.'
import { map } from 'lodash'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@packages/ui/components/index'
import { LayoutGridIcon, LayoutListIcon } from '@packages/ui/icons/index'

type Props = {
  children: React.ReactNode
  breadcrumbs: {
    title: string
    href?: string
  }[]
  title: string
}

export const Layout: React.FC<Props> = ({ children, breadcrumbs, title }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarDesktop />
      <div className="flex flex-col sm:gap-4 sm:pb-4 sm:pl-14">
        <Header title={title} />
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <div className="flex items-center justify-between mb-4">
            <Breadcrumb className="flex">
              <BreadcrumbList>
                {map(breadcrumbs, (breadcrumb, index) => (
                  <BreadcrumbItem key={index}>
                    {breadcrumb.href ? (
                      <BreadcrumbLink asChild>
                        <Link href="/">{breadcrumb.title}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbItem>
                        <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    )}
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <Tabs defaultValue="list" className="w-fit">
              <TabsList className="p-1 h-fit">
                <TabsTrigger value="list">
                  <LayoutListIcon size={16} />
                </TabsTrigger>
                <TabsTrigger value="grid">
                  <LayoutGridIcon size={16} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
