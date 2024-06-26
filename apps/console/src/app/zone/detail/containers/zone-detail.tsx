'use client'

import { Consoles, Gateways, Medias } from '../components'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import { ExternalLinkIcon } from '@packages/ui/icons/index'
import { useDetailZoneQuery } from '@/hooks'

export const ZoneDetail = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('zone_id')
  const { data: dataDetailZone } = useDetailZoneQuery({
    payload: {
      id,
    },
    options: {
      enabled: !!id,
    },
  })

  if (!id) redirect('/zone/list')

  return (
    <div className="grid gap-6">
      <Link
        href={`https://maps.google.com/?q=${dataDetailZone?.data?.lat},${dataDetailZone?.data?.lon}`}
        target="_blank"
        className="flex items-center gap-2 text-muted-foreground font-medium"
      >
        <div>Lat: {dataDetailZone?.data?.lat}</div>|<div>Lon: {dataDetailZone?.data?.lon}</div>
        <ExternalLinkIcon size={16} />
      </Link>
      <Consoles consoles={dataDetailZone?.data?.consoles} />
      <Gateways gateways={dataDetailZone?.data?.gateways} />
      <Medias medias={dataDetailZone?.data?.medias} />
    </div>
  )
}
