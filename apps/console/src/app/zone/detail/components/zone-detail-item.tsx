'use client'

import { isNumber, map } from 'lodash'
import { useRouter } from 'next/navigation'
import { Badge, Button, Card, CardContent } from '@packages/ui/components/index'
import { TDataDetailZoneCommon } from '@/hooks'

type Props = {
  title: string
  data?: TDataDetailZoneCommon[]
  hasLogs?: boolean
}

export const ZoneDetailItem: React.FC<Props> = ({ title, data, hasLogs }) => {
  const router = useRouter()
  const filterAddr = (addr: string) => {
    const arr = addr.split('/')
    return `${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}/${arr[4]}/${arr[5]}/.../${arr[arr.length - 2]}/${arr[arr.length - 1]}`
  }

  return (
    <div>
      <h2 className="font-medium capitalize mb-2">{title}</h2>
      <div className="grid gap-4 xl:grid-cols-2">
        {map(data, (d, dIdx) => (
          <Card key={dIdx}>
            <CardContent className="p-3 grid gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs flex flex-row gap-y-2">
                  <div className="w-20 font-medium">node_id</div>
                  <div className="flex-1">{d?.node_id}</div>
                </div>
                {hasLogs && (
                  <div className="flex items-center">
                    <Button
                      onClick={() => {
                        router.push(`/zone/rooms?connector_id=${d?.node_id}`)
                      }}
                      variant="ghost"
                      className="gap-1 text-xs h-8 items-center underline"
                    >
                      Logs Rooms
                    </Button>
                    <Button
                      onClick={() => {
                        router.push(`/zone/sessions?connector_id=${d?.node_id}`)
                      }}
                      variant="ghost"
                      className="gap-1 text-xs h-8 items-center underline"
                    >
                      Logs Sessions
                    </Button>
                    <Button
                      onClick={() => {
                        router.push(`/zone/events?connector_id=${d?.node_id}`)
                      }}
                      variant="ghost"
                      className="gap-1 text-xs h-8 items-center underline"
                    >
                      Logs Events
                    </Button>
                  </div>
                )}
              </div>
              <div className="text-xs flex flex-col lg:flex-row gap-y-2">
                <div className="w-20 font-medium">addr</div>
                <div className="flex-1">
                  <div className="line-clamp-1">{filterAddr(d?.addr)}</div>
                </div>
              </div>
              <div className="text-xs flex flex-col lg:flex-row gap-y-2">
                <div className="w-20 font-medium">conns</div>
                <div className="flex-1">
                  <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                    {map(d?.conns, (connect, cIdx) => (
                      <div className="flex items-center gap-1 bg-muted rounded px-1" key={cIdx}>
                        addr: {connect.addr}, node: {connect.node}, rtt_ms: {connect.rtt_ms}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>cpu:</div>
                  <div>{d?.cpu}</div>
                </Badge>
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>disk:</div>
                  <div>{d?.disk}</div>
                </Badge>
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>memory:</div>
                  <div>{d?.memory}</div>
                </Badge>
                {isNumber(d?.live) && (
                  <Badge variant="secondary" className="rounded w-fit gap-2">
                    <div>live:</div>
                    <div>{d?.live}</div>
                  </Badge>
                )}
                {isNumber(d?.max) && (
                  <Badge variant="secondary" className="rounded w-fit gap-2">
                    <div>max:</div>
                    <div>{d?.max}</div>
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
