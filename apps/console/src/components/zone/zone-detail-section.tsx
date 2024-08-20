'use client'

import { map } from 'lodash'
import { TDataDetailZoneCommon } from '@/hooks'
import { ZoneDetailCard } from './zone-detail-card'

type Props = {
  title: string
  data?: TDataDetailZoneCommon[]
  hasLogs?: boolean
}

export const ZoneDetailSection: React.FC<Props> = ({ title, data, hasLogs }) => {
  return (
    <div>
      <h2 className="font-medium capitalize mb-2">{title}</h2>
      <div className="grid gap-4 xl:grid-cols-2">
        {map(data, (d) => (
          <ZoneDetailCard item={d} key={d?.node_id} hasLogs={hasLogs} />
        ))}
      </div>
    </div>
  )
}
