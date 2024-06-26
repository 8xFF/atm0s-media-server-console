import { Layout, Private } from '@/components'

type Props = {
  children: React.ReactNode
}

const SummaryLayoutScreen: React.FC<Props> = ({ children }) => {
  return (
    <Private>
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
