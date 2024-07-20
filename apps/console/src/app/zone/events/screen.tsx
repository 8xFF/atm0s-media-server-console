'use client'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { isEmpty, map } from 'lodash'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@packages/ui/components/index'
import { Layout, Pagination } from '@/components'
import { useConnectorLogEventsQuery } from '@/hooks'

dayjs.extend(LocalizedFormat)

export const ZoneEvents = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const connector_id = searchParams.get('connector_id')
  if (!connector_id) redirect('/zone/list')

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0
  const [limit] = useState(20)
  const { data: events } = useConnectorLogEventsQuery({
    payload: {
      connector_id,
      page,
      limit,
    },
    options: {
      enabled: !!connector_id,
    },
  })

  const onPrev = () => {
    if (page === 0) return
    router.push(`/zone/events?connector_id=${connector_id}&page=${page - 1}`)
  }

  const onNext = () => {
    router.push(`/zone/events?connector_id=${connector_id}&page=${page + 1}`)
  }

  return (
    <Layout
      breadcrumbs={[
        {
          title: 'Zones',
          href: '/zone/list',
        },
        {
          title: '...',
        },
        {
          title: 'Events',
        },
      ]}
      title="Events"
      hasBackButton
    >
      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-0">
            <Pagination onPrev={onPrev} onNext={onNext} />
          </CardHeader>
          <CardContent className="p-3 grid gap-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Node Id</TableHead>
                  <TableHead className="text-right">Node Timestamp</TableHead>
                  <TableHead className="text-right">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isEmpty(events?.data) ? (
                  map(events?.data, (e) => (
                    <TableRow key={e?.id}>
                      <TableCell>{e?.id}</TableCell>
                      <TableCell>{e?.event}</TableCell>
                      <TableCell>{e?.session}</TableCell>
                      <TableCell>{e?.node}</TableCell>
                      <TableCell className="text-right">{e?.node_ts ? dayjs(e?.node_ts).format('LLL') : '---'}</TableCell>
                      <TableCell className="text-right">
                        {e?.created_at ? dayjs(e?.created_at).format('LLL') : '---'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      <span className="text-muted-foreground">No events found</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Pagination onPrev={onPrev} onNext={onNext} />
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}
