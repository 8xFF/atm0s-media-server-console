'use client'

import { CreateZone, ZoneItem } from './components'
import { map } from 'lodash'
import { Layout } from '@/components'
import { useZonesQuery } from '@/hooks'

export const ZoneList = () => {
  const { data: dataZones } = useZonesQuery({})

  return (
    <Layout
      breadcrumbs={[
        {
          title: 'Zones',
          href: '/',
        },
        {
          title: 'Overview',
        },
      ]}
      title="Zones"
      extra={
        <CreateZone />
      }
    >
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {map(dataZones?.data, (zone) => (
          <ZoneItem zone={zone} key={zone?.zone_id} />
        ))}
      </div>
    </Layout>
  )
}
