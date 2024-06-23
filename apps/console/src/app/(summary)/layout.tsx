import { Layout, Private } from '@/components'
import { checkAuth } from '@/middleware'

type Props = {
  children: React.ReactNode
}

const SummaryLayoutScreen: React.FC<Props> = ({ children }) => {
  const { hasAccess } = checkAuth()

  return (
    <Private hasAccess={hasAccess}>
      <Layout
        breadcrumbs={[
          {
            title: 'Summary',
            href: '/',
          },
          {
            title: 'Overview',
          },
        ]}
        title="Summary"
      >
        {children}
      </Layout>
    </Private>
  )
}

export default SummaryLayoutScreen
