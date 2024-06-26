import { Layout, Private } from '@/components'

type Props = {
  children: React.ReactNode
  params: {
    id: string
  }
}

const DetailZoneLayoutScreen: React.FC<Props> = ({ children }) => {
  return (
    <Private>
      <Layout
        breadcrumbs={[
          {
            title: 'Zones',
            href: '/zone/list',
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
