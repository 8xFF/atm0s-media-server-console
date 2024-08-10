'use client'

import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { Layout, ZoneDetailSection } from '@/components'
import { useDetailZoneQuery } from '@/hooks'

export const ZoneDetail = () => {
  const searchParams = useSearchParams()
  const zone_id = searchParams.get('zone_id')
  const { data: dataDetailZone } = useDetailZoneQuery({
    payload: {
      zone_id,
    },
    options: {
      enabled: !!zone_id,
    },
  })

  if (!zone_id) redirect('/zone/list')

  return (
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
      title="Zone Detail"
      hasBackButton
    >
      <div className="grid gap-6">
        <Link
          href={`https://maps.google.com/?q=${dataDetailZone?.data?.lat},${dataDetailZone?.data?.lon}`}
          target="_blank"
          className="flex text-xs lg:text-md items-center gap-2 text-muted-foreground font-medium w-fit"
        >
          <div className="whitespace-nowrap">Lat: {dataDetailZone?.data?.lat}</div>|
          <div className="whitespace-nowrap">Lon: {dataDetailZone?.data?.lon}</div>
        </Link>
        <ZoneDetailSection title="connectors" data={dataDetailZone?.data?.connectors} hasLogs />
        <ZoneDetailSection title="consoles" data={dataDetailZone?.data?.consoles} />
        <ZoneDetailSection title="gateways" data={dataDetailZone?.data?.gateways} />
        <ZoneDetailSection title="medias" data={dataDetailZone?.data?.medias} />
      </div>
    </Layout>
  )
}
