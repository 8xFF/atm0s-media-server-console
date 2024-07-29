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
import { TDataConnectorLogSessions, useConnectorLogSessionsQuery } from '@/hooks'
import { INITIAL_LIMIT, INITIAL_PAGE } from '@/utils'

dayjs.extend(LocalizedFormat)

export const ZoneSessions = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const connector_id = searchParams.get('connector_id')
  if (!connector_id) redirect('/zone/list')

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : INITIAL_PAGE
  const [limit, setLimit] = useState(INITIAL_LIMIT)
  const { data: sessions } = useConnectorLogSessionsQuery({
    payload: {
      connector_id,
      page: page - 1,
      limit,
    },
    options: {
      enabled: !!connector_id,
    },
  })

  const onPrev = () => {
    router.push(`/zone/sessions?connector_id=${connector_id}&page=${page - 1}`)
  }

  const onNext = () => {
    router.push(`/zone/sessions?connector_id=${connector_id}&page=${page + 1}`)
  }

  const onFirst = () => {
    router.push(`/zone/sessions?connector_id=${connector_id}&page=1`)
  }

  const onLast = () => {
    router.push(`/zone/sessions?connector_id=${connector_id}&page=${sessions?.pagination?.total}`)
  }

  const onChangeLimit = (value: number) => {
    setLimit(value)
    router.push(`/zone/sessions?connector_id=${connector_id}&page=1`)
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
          title: 'Sessions',
        },
      ]}
      title="Sessions"
      hasBackButton
    >
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
              {!isEmpty(sessions?.data) ? (
                map(sessions?.data, (s) => <LogsPeerItem session={s} key={s?.id} />)
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    <span className="text-muted-foreground">No sessions found</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="sticky bottom-0 bg-white pt-6 rounded-lg overflow-hidden">
          <Pagination
            onFirst={onFirst}
            onLast={onLast}
            onPrev={onPrev}
            onNext={onNext}
            pagination={sessions?.pagination}
            limit={limit}
            setLimit={onChangeLimit}
          />
        </CardFooter>
      </Card>
    </Layout>
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
