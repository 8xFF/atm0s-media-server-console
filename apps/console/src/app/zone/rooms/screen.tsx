'use client'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { isEmpty, map } from 'lodash'
import Link from 'next/link'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  Button,
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
import { useConnectorLogRoomsQuery } from '@/hooks'

dayjs.extend(LocalizedFormat)

export const ZoneRooms = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const connector_id = searchParams.get('connector_id')
  if (!connector_id) redirect('/zone/list')

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 0
  const [limit] = useState(20)
  const { data: rooms } = useConnectorLogRoomsQuery({
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
    router.push(`/zone/rooms?connector_id=${connector_id}&page=${page - 1}`)
  }

  const onNext = () => {
    router.push(`/zone/rooms?connector_id=${connector_id}&page=${page + 1}`)
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
          title: 'Rooms',
        },
      ]}
      title="Rooms"
      hasBackButton
    >
      <Card>
        <CardHeader className="pb-0">
          <Pagination onPrev={onPrev} onNext={onNext} />
        </CardHeader>
        <CardContent className="p-3 grid gap-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Peers</TableHead>
                <TableHead className="text-right">Created At</TableHead>
                <TableHead className="w-[102px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isEmpty(rooms?.data) ? (
                map(rooms?.data, (r) => (
                  <TableRow key={r?.id}>
                    <TableCell>{r?.id}</TableCell>
                    <TableCell>{r?.room}</TableCell>
                    <TableCell>{r?.peers}</TableCell>
                    <TableCell className="text-right">
                      {r?.created_at ? dayjs(r?.created_at).format('LLL') : '---'}
                    </TableCell>
                    <TableCell>
                      <Link href={`/zone/peers?connector_id=${connector_id}&room_id=${r?.id}`}>
                        <Button variant="ghost" className="text-xs h-8 items-center underline">
                          View details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <span className="text-muted-foreground">No rooms found</span>
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
    </Layout>
  )
}
