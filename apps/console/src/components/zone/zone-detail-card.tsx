'use client'

import { TextCopy } from '..'
import { isNumber, map } from 'lodash'
import { useRouter } from 'next/navigation'
import {
  Badge,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@packages/ui/components/index'
import { TDataDetailZoneCommon } from '@/hooks'

type Props = {
  item: TDataDetailZoneCommon
  hasLogs?: boolean
}

export const ZoneDetailCard: React.FC<Props> = ({ item, hasLogs }) => {
  const router = useRouter()
  return (
    <Card>
      <CardContent className="p-3 grid gap-3">
        <div className="flex items-center justify-between">
          <div className="text-xs flex flex-row gap-y-2">
            <div className="w-20 font-medium">node_id</div>
            <div className="flex-1">{item?.node_id}</div>
          </div>
          {hasLogs && (
            <DropdownMenu>
              <DropdownMenuTrigger className="underline text-xs">View Logs</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/zone/rooms?connector_id=${item?.node_id}`)
                  }}
                >
                  Logs Rooms
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/zone/sessions?connector_id=${item?.node_id}`)
                  }}
                >
                  Logs Sessions
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/zone/events?connector_id=${item?.node_id}`)
                  }}
                >
                  Logs Events
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="text-xs flex flex-col lg:flex-row gap-y-2">
          <div className="w-20 font-medium">addr</div>
          <div className="flex-1">
            <TextCopy value={item?.addr} />
          </div>
        </div>
        <div className="text-xs flex flex-col lg:flex-row gap-y-2">
          <div className="w-20 font-medium">conns</div>
          <div className="flex-1">
            <div className="flex items-center gap-x-2 gap-y-2 flex-wrap">
              {map(item?.conns, (connect, cIdx) => (
                <div className="flex items-center gap-1 bg-muted rounded p-1" key={cIdx}>
                  addr: {connect.addr}, node: {connect.node}, rtt_ms: {connect.rtt_ms}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="rounded w-fit gap-2">
            <div>cpu:</div>
            <div>{item?.cpu}</div>
          </Badge>
          <Badge variant="secondary" className="rounded w-fit gap-2">
            <div>disk:</div>
            <div>{item?.disk}</div>
          </Badge>
          <Badge variant="secondary" className="rounded w-fit gap-2">
            <div>memory:</div>
            <div>{item?.memory}</div>
          </Badge>
          {isNumber(item?.live) && (
            <Badge variant="secondary" className="rounded w-fit gap-2">
              <div>live:</div>
              <div>{item?.live}</div>
            </Badge>
          )}
          {isNumber(item?.max) && (
            <Badge variant="secondary" className="rounded w-fit gap-2">
              <div>max:</div>
              <div>{item?.max}</div>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
