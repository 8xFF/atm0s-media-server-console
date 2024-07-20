import { Private } from '@/components'

type Props = {
  children: React.ReactNode
}

const ZoneLayout: React.FC<Props> = ({ children }) => {
  return <Private>{children}</Private>
}

export default ZoneLayout
