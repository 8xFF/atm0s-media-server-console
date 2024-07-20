import { Layout, Private } from '@/components'

type Props = {
  children: React.ReactNode
}

const ZoneRoomsLayout: React.FC<Props> = ({ children }) => {
  const title = 'Rooms'
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

export default ZoneRoomsLayout
