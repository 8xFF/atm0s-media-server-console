'use client'

import { useSearchParams } from 'next/navigation'
import { TDataConnectorLogsPeers, useConnectorLogsPeersQuery } from '@/hooks'
import { Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@packages/ui/components/index'
import { map } from 'lodash'
import dayjs from 'dayjs'
import { Fragment, useState } from 'react'
import { MinusIcon, PlusIcon } from '@packages/ui/icons/index'

type Props = {
}

export const LogsPeers: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('connector_id')
  const { data } = useConnectorLogsPeersQuery({
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
              <TableHead className="w-6" />
              <TableHead>Id</TableHead>
              <TableHead>Peer</TableHead>
              <TableHead>Room Id</TableHead>
              <TableHead>Room</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(data?.data, (d) => (
              <LogsPeerItem peer={d} key={d?.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

type LogsPeerItemProps = {
  peer: TDataConnectorLogsPeers
}

const LogsPeerItem: React.FC<LogsPeerItemProps> = ({
  peer
}) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <TableRow className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <TableCell>
          {!expanded ? <PlusIcon className="text-muted-foreground" size={16} /> : <MinusIcon className="text-muted-foreground" size={16} />}
        </TableCell>
        <TableCell>{peer?.id}</TableCell>
        <TableCell>{peer?.peer}</TableCell>
        <TableCell>{peer?.room_id}</TableCell>
        <TableCell>{peer?.room}</TableCell>
        <TableCell className="text-right">{peer?.created_at ? dayjs(peer?.created_at).format('LLL') : '---'}</TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={6} className="bg-muted">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">Sessions</CardTitle>
              </CardHeader>
              <CardContent className="p-3 grid gap-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Session</TableHead>
                      <TableHead>Peer Id</TableHead>
                      <TableHead>Peer</TableHead>
                      <TableHead className="text-right">Leaved At</TableHead>
                      <TableHead className="text-right">Joined At</TableHead>
                      <TableHead className="text-right">Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {map(peer?.sessions, (s) => (
                      <Fragment key={s?.id}>
                        <TableRow>
                          <TableCell>{s?.id}</TableCell>
                          <TableCell>{s?.session}</TableCell>
                          <TableCell>{s?.peer_id}</TableCell>
                          <TableCell>{s?.peer}</TableCell>
                          <TableCell className="text-right">{s?.leaved_at ? dayjs(s?.leaved_at).format('LLL') : '---'}</TableCell>
                          <TableCell className="text-right">{s?.joined_at ? dayjs(s?.joined_at).format('LLL') : '---'}</TableCell>
                          <TableCell className="text-right">{s?.created_at ? dayjs(s?.created_at).format('LLL') : '---'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={5}>

                          </TableCell>
                        </TableRow>
                      </Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}