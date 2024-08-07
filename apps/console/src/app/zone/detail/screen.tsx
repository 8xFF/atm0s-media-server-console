'use client'

import { ZoneDetailItem } from './components'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { ExternalLinkIcon } from '@packages/ui/icons/index'
import { Layout } from '@/components'
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
          className="flex items-center gap-2 text-muted-foreground font-medium w-fit"
        >
          <div>Lat: {dataDetailZone?.data?.lat}</div>|<div>Lon: {dataDetailZone?.data?.lon}</div>
          <ExternalLinkIcon size={16} />
        </Link>
        <ZoneDetailItem title="connectors" data={dataDetailZone?.data?.connectors} hasLogs />
        <ZoneDetailItem title="consoles" data={dataDetailZone?.data?.consoles} />
        <ZoneDetailItem title="gateways" data={dataDetailZone?.data?.gateways} />
        <ZoneDetailItem title="medias" data={dataDetailZone?.data?.medias} />
      </div>
    </Layout>
  )
}
