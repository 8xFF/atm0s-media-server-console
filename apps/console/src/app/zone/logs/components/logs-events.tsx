'use client'

import { useSearchParams } from 'next/navigation'
import { useConnectorLogsEventsQuery } from '@/hooks'
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@packages/ui/components/index'
import { map } from 'lodash'
import dayjs from 'dayjs'

type Props = {
}

export const LogsEvents: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('connector_id')
  const { data } = useConnectorLogsEventsQuery({
    payload: {
      id,
      page: 0,
      limit: 10000,
    },
    options: {
      enabled: !!id,
    },
  })
  return (
    <Card>
      <CardContent className="p-3 grid gap-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Session</TableHead>
              <TableHead>Node</TableHead>
              <TableHead className="text-right">Node Timestamp</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(data?.data, (d) => (
              <TableRow key={d?.id}>
                <TableCell>{d?.id}</TableCell>
                <TableCell>{d?.event}</TableCell>
                <TableCell>{d?.session}</TableCell>
                <TableCell>{d?.node}</TableCell>
                <TableCell className="text-right">{d?.node_ts ? dayjs(d?.node_ts).format('LLL') : '---'}</TableCell>
                <TableCell className="text-right">{d?.created_at ? dayjs(d?.created_at).format('LLL') : '---'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

