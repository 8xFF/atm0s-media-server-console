'use client'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { map } from 'lodash'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@packages/ui/components/index'
import { useConnectorLogRoomsQuery } from '@/hooks'

dayjs.extend(LocalizedFormat)

export const ZoneRooms = () => {
  const searchParams = useSearchParams()
  const connector_id = searchParams.get('connector_id')

  if (!connector_id) redirect('/zone/list')

  const { data: rooms } = useConnectorLogRoomsQuery({
    payload: {
      connector_id,
      page: 0,
      limit: 10000,
    },
    options: {
      enabled: !!connector_id,
    },
  })

  return (
    <div className="grid gap-4">
      <Card>
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
              {map(rooms?.data, (r) => (
                <TableRow key={r?.id}>
                  <TableCell>{r?.id}</TableCell>
                  <TableCell>{r?.room}</TableCell>
                  <TableCell>{r?.peers}</TableCell>
                  <TableCell className="text-right">{r?.created_at ? dayjs(r?.created_at).format('LLL') : '---'}</TableCell>
                  <TableCell>
                    <Link href={`/zone/peers?connector_id=${connector_id}&room_id=${r?.id}`}>
                      <Button variant="ghost" className="text-xs h-8 items-center underline">
                        View details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
