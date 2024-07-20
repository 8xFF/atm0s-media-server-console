import { Layout, Private } from '@/components'

type Props = {
  children: React.ReactNode
}

const ZonePeersLayout: React.FC<Props> = ({ children }) => {
  const title = 'Peers'
  return (
    <Private>
      <Layout
        breadcrumbs={[
          {
            title: 'Zones',
            href: '/zone/list',
          },
          {
            title,
          },
        ]}
        title={title}
        hasBackButton
      >
        {children}
      </Layout>
    </Private>
  )
}

export default ZonePeersLayout
