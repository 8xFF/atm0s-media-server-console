import { Private } from '@/components'

type Props = {
  children: React.ReactNode
}

const SummaryLayout: React.FC<Props> = ({ children }) => {
  return <Private>{children}</Private>
}

export default SummaryLayout
