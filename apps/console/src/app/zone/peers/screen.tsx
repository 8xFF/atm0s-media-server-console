'use client'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { isEmpty, map } from 'lodash'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
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
import { Layout, Pagination } from '@/components'
import { TDataConnectorLogPeers, useConnectorLogPeersQuery } from '@/hooks'
import { INITIAL_LIMIT, INITIAL_PAGE } from '@/utils'

dayjs.extend(LocalizedFormat)

export const ZonePeers = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const connector_id = searchParams.get('connector_id')
  const room_id = searchParams.get('room_id')

  if (!connector_id) redirect('/zone/list')

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : INITIAL_PAGE
  const [limit, setLimit] = useState(INITIAL_LIMIT)
  const { data: peers } = useConnectorLogPeersQuery({
    payload: {
      connector_id,
      room_id,
      page: page - 1,
      limit,
    },
    options: {
      enabled: !!connector_id && !!room_id,
    },
  })

  const onPrev = () => {
    router.push(`/zone/peers?connector_id=${connector_id}&page=${page - 1}`)
  }

  const onNext = () => {
    router.push(`/zone/peers?connector_id=${connector_id}&page=${page + 1}`)
  }

  const onFirst = () => {
    router.push(`/zone/peers?connector_id=${connector_id}&page=1`)
  }

  const onLast = () => {
    router.push(`/zone/peers?connector_id=${connector_id}&page=${peers?.pagination?.total}`)
  }

  const onChangeLimit = (value: number) => {
    setLimit(value)
    router.push(`/zone/peers?connector_id=${connector_id}&page=1`)
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
          title: 'Peers',
        },
      ]}
      title="Peers"
      hasBackButton
    >
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
              {!isEmpty(peers?.data) ? (
                map(peers?.data, (p) => <LogsPeerItem peer={p} key={p?.id} />)
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <span className="text-muted-foreground">No peers found</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="sticky bottom-0 bg-white pt-6">
          <Pagination
            onFirst={onFirst}
            onLast={onLast}
            onPrev={onPrev}
            onNext={onNext}
            pagination={peers?.pagination}
            limit={limit}
            setLimit={onChangeLimit}
          />
        </CardFooter>
      </Card>
    </Layout>
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
