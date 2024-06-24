import { Layout, Private } from '@/components'
import { checkAuth } from '@/middleware'

type Props = {
  children: React.ReactNode
  params: {
    id: string
  }
}

const DetailZoneLayoutScreen: React.FC<Props> = ({ children }) => {
  const { hasAccess } = checkAuth()

  return (
    <Private hasAccess={hasAccess}>
      <Layout
        breadcrumbs={[
          {
            title: 'Zones',
            href: '/zones',
          },
          {
            title: 'Detail',
          },
        ]}
        title="Detail Zone"
        hasBackButton
      >
        {children}
      </Layout>
    </Private>
  )
}

export default DetailZoneLayoutScreen
