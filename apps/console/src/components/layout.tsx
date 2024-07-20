'use client'

import { Header, SidebarDesktop } from '.'
import { map } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@packages/ui/components/index'
import { ChevronLeftIcon, LayoutGridIcon, LayoutListIcon } from '@packages/ui/icons/index'
import { useRecoilState } from '@packages/ui/providers/index'
import { LayoutSettings, layoutSettingsAtom } from '@/recoils'

type Props = {
  children: React.ReactNode
  breadcrumbs: {
    title: string
    href?: string
  }[]
  title: string
  visibleLayoutSetting?: boolean
  hasBackButton?: boolean
}

export const Layout: React.FC<Props> = ({ children, breadcrumbs, title, visibleLayoutSetting, hasBackButton }) => {
  const router = useRouter()
  const [layoutSettings, setLayoutSettings] = useRecoilState(layoutSettingsAtom)
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 pb-6">
      <SidebarDesktop />
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <Header title={title} />
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 h-7">
              {hasBackButton && (
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              )}
              <Breadcrumb className="flex">
                <BreadcrumbList>
                  {map(breadcrumbs, (breadcrumb, index) => (
                    <BreadcrumbItem key={index}>
                      {breadcrumb.href ? (
                        <BreadcrumbLink asChild>
                          <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
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
            </div>
            {visibleLayoutSetting && (
              <Tabs value={layoutSettings} onValueChange={setLayoutSettings} className="w-fit">
                <TabsList className="p-1 h-fit">
                  <TabsTrigger value={LayoutSettings.List}>
                    <LayoutListIcon size={16} />
                  </TabsTrigger>
                  <TabsTrigger value={LayoutSettings.Grid}>
                    <LayoutGridIcon size={16} />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
