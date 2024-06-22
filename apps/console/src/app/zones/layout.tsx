import { Layout, Private } from '@/components'
import { checkAuth } from '@/middleware'

type Props = {
  children: React.ReactNode
}

const ZonesLayoutScreen: React.FC<Props> = ({ children }) => {
  const { hasAccess } = checkAuth()

  return (
    <Private hasAccess={hasAccess}>
      <Layout>{children}</Layout>
    </Private>
  )
}

export default ZonesLayoutScreen
