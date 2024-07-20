'use client'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { map } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@packages/ui/components/index'
import { MinusIcon, PlusIcon } from '@packages/ui/icons/index'
import { TDataConnectorLogPeers, useConnectorLogPeersQuery } from '@/hooks'

dayjs.extend(LocalizedFormat)

export const ZonePeers = () => {
  const searchParams = useSearchParams()
  const connector_id = searchParams.get('connector_id')
  const room_id = searchParams.get('room_id')
  const { data: peers } = useConnectorLogPeersQuery({
    payload: {
      connector_id,
      room_id,
      page: 0,
      limit: 10000,
    },
    options: {
      enabled: !!connector_id,
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
            {map(peers?.data, (p) => (
              <LogsPeerItem peer={p} key={p?.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

type LogsPeerItemProps = {
  peer: TDataConnectorLogPeers
}

const LogsPeerItem: React.FC<LogsPeerItemProps> = ({ peer }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <TableRow className="cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <TableCell>
          {!expanded ? (
            <PlusIcon className="text-muted-foreground" size={16} />
          ) : (
            <MinusIcon className="text-muted-foreground" size={16} />
          )}
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
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="text-base font-medium">Sessions</CardTitle>
              </CardHeader>
              <CardContent className="p-3 grid gap-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Session</TableHead>
                      <TableHead className="text-right">Created At</TableHead>
                      <TableHead className="text-right">Joined At</TableHead>
                      <TableHead className="text-right">Leaved At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {map(peer?.sessions, (s) => (
                      <Fragment key={s?.id}>
                        <TableRow>
                          <TableCell>{s?.id}</TableCell>
                          <TableCell>{s?.session}</TableCell>
                          <TableCell className="text-right">
                            {s?.created_at ? dayjs(s?.created_at).format('LLL') : '---'}
                          </TableCell>
                          <TableCell className="text-right">
                            {s?.joined_at ? dayjs(s?.joined_at).format('LLL') : '---'}
                          </TableCell>
                          <TableCell className="text-right">
                            {s?.leaved_at ? dayjs(s?.leaved_at).format('LLL') : '---'}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={5}></TableCell>
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
