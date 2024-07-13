import { Layout, Private } from '@/components'

type Props = {
  children: React.ReactNode
}

const ZoneLogsLayoutScreen: React.FC<Props> = ({ children }) => {
  return (
    <Private>
      <Layout
        breadcrumbs={[
          {
            title: 'Zones',
            href: '/zone/list',
          },
          {
            title: 'Logs',
          },
        ]}
        title="Logs"
        hasBackButton
      >
        {children}
      </Layout>
    </Private>
  )
}

export default ZoneLogsLayoutScreen
