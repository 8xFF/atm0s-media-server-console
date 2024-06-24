'use client'

import { ZoneItem } from './components'
import { map } from 'lodash'
import { useZonesQuery } from '@/hooks'

export default function ZonesScreen() {
  const { data: dataZones } = useZonesQuery()

  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {map(dataZones?.data, (zone) => (
        <ZoneItem zone={zone} key={zone?.zone_id} />
      ))}
    </div>
  )
}
