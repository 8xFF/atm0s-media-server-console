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
import { TDataConnectorLogSessions, useConnectorLogSessionsQuery } from '@/hooks'

dayjs.extend(LocalizedFormat)

export const ZoneSessions = () => {
  const searchParams = useSearchParams()
  const connector_id = searchParams.get('connector_id')
  const { data: sessions } = useConnectorLogSessionsQuery({
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
    <Card>
      <CardContent className="p-3 grid gap-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-6" />
              <TableHead>Id</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>SDK</TableHead>
              <TableHead>User Agent</TableHead>
              <TableHead className="text-right">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(sessions?.data, (s) => (
              <LogsPeerItem session={s} key={s?.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

type LogsPeerItemProps = {
  session: TDataConnectorLogSessions
}

const LogsPeerItem: React.FC<LogsPeerItemProps> = ({ session }) => {
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
        <TableCell>{session?.id}</TableCell>
        <TableCell>{session?.ip}</TableCell>
        <TableCell>{session?.sdk}</TableCell>
        <TableCell>{session?.user_agent}</TableCell>
        <TableCell className="text-right">
          {session?.created_at ? dayjs(session?.created_at).format('LLL') : '---'}
        </TableCell>
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
                    {map(session?.sessions, (s) => (
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
