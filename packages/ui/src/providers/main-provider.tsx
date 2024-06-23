'use client'

import { ReactQueryProvider, RecoilProvider, ThemeProvider } from '.'
import { TooltipProvider } from '../components'

type Props = {
  children: React.ReactNode
}

export const MainProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReactQueryProvider>
        <RecoilProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </RecoilProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  )
}
