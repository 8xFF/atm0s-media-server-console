'use client'

import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { map, slice, times } from 'lodash'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@packages/ui/components/index'
import { useConnectorLogEventsQuery } from '@/hooks'

dayjs.extend(LocalizedFormat)

export const ZoneEvents = () => {
  const searchParams = useSearchParams()
  const connector_id = searchParams.get('connector_id')

  if (!connector_id) redirect('/zone/list')

  const pageSize = 20
  const [page, setPage] = useState(0)

  const { data: events } = useConnectorLogEventsQuery({
    payload: {
      connector_id,
      page,
      limit: 10000,
    },
    options: {
      enabled: !!connector_id,
    },
  })

  // const totalPages = Math.ceil((events?.data?.length || 0) / pageSize)

  return (
    <div className="grid gap-4">
      <Card>
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
              {map(events?.data, (e) => (
                <TableRow key={e?.id}>
                  <TableCell>{e?.id}</TableCell>
                  <TableCell>{e?.event}</TableCell>
                  <TableCell>{e?.session}</TableCell>
                  <TableCell>{e?.node}</TableCell>
                  <TableCell className="text-right">{e?.node_ts ? dayjs(e?.node_ts).format('LLL') : '---'}</TableCell>
                  <TableCell className="text-right">{e?.created_at ? dayjs(e?.created_at).format('LLL') : '---'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter>
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              {map(slice(times(totalPages), 0, 10), (i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={i === page}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalPages > 10 && (
                <>
                  <PaginationEllipsis />
                  {map(slice(times(totalPages), totalPages - 1, totalPages), (i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" isActive={i === page}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </>
              )}
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter> */}
      </Card>
    </div>
  )
}
