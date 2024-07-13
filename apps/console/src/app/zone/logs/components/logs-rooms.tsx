'use client'

import { useSearchParams } from 'next/navigation'
import { useConnectorLogsRoomsQuery } from '@/hooks'
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@packages/ui/components/index'
import { map } from 'lodash'

type Props = {
}

export const LogsRooms: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('connector_id')
  const { data } = useConnectorLogsRoomsQuery({
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
              <TableHead>Room</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(data?.data, (d) => (
              <TableRow key={d?.id}>
                <TableCell>{d?.id}</TableCell>
                <TableCell>{d?.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

