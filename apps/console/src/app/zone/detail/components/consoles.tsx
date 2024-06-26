'use client'

import { map } from 'lodash'
import { Fragment } from 'react'
import { Badge, Card, CardContent } from '@packages/ui/components/index'
import { TDataDetailZoneConsole } from '@/hooks'

type Props = {
  consoles?: TDataDetailZoneConsole[]
}

export const Consoles: React.FC<Props> = ({ consoles }) => {
  const filterAddr = (addr: string) => {
    const arr = addr.split('/')
    return `${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}/${arr[4]}/${arr[5]}/.../${arr[arr.length - 2]}/${arr[arr.length - 1]}`
  }

  return (
    <div>
      <h2 className="font-medium mb-2">Consoles</h2>
      <div className="grid gap-4 xl:grid-cols-2">
        {map(consoles, (console, cIdx) => (
          <Card key={cIdx}>
            <CardContent className="p-3 grid gap-2">
              <div className="text-xs flex flex-col lg:flex-row gap-y-2">
                <div className="w-20 font-medium">node_id</div>
                <div className="flex-1">{console?.node_id}</div>
              </div>
              <div className="text-xs flex flex-col lg:flex-row gap-y-2">
                <div className="w-20 font-medium">addr</div>
                <div className="flex-1">
                  <div className="line-clamp-1">{filterAddr(console?.addr)}</div>
                </div>
              </div>
              <div className="text-xs flex flex-col lg:flex-row gap-y-2">
                <div className="w-20 font-medium">conns</div>
                <div className="flex-1">
                  <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                    {map(console?.conns, (connect, cIdx) => (
                      <Fragment key={cIdx}>
                        <div className="flex items-center gap-1" key={cIdx}>
                          addr: {connect.addr}, node: {connect.node}, rtt_ms: {connect.rtt_ms}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>cpu:</div>
                  <div>{console?.cpu}</div>
                </Badge>
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>disk:</div>
                  <div>{console?.disk}</div>
                </Badge>
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>memory:</div>
                  <div>{console?.memory}</div>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
