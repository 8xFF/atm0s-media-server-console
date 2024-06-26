import { Layout, Private } from '@/components'

type Props = {
  children: React.ReactNode
}

const ZonesLayoutScreen: React.FC<Props> = ({ children }) => {
  return (
    <Private>
      <Layout
        breadcrumbs={[
          {
            title: 'Zones',
            href: '/',
          },
          {
            title: 'Overview',
          },
        ]}
        title="Zones"
      >
        {children}
      </Layout>
    </Private>
  )
}

export default ZonesLayoutScreen
