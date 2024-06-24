'use client'

import { map } from 'lodash'
import { Fragment } from 'react'
import { Badge, Card, CardContent } from '@packages/ui/components/index'
import { TDataDetailZoneMedia } from '@/hooks'

type Props = {
  medias?: TDataDetailZoneMedia[]
}

export const Medias: React.FC<Props> = ({ medias }) => {
  const filterAddr = (addr: string) => {
    const arr = addr.split('/')
    return `${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}/${arr[4]}/${arr[5]}/.../${arr[arr.length - 2]}/${arr[arr.length - 1]}`
  }

  return (
    <div>
      <h2 className="font-medium mb-2">Medias</h2>
      <div className="grid gap-4 xl:grid-cols-2">
        {map(medias, (media, mIdx) => (
          <Card key={mIdx}>
            <CardContent className="p-3 grid gap-2">
              <div className="text-xs flex flex-col lg:flex-row gap-y-2">
                <div className="w-20 font-medium">node_id</div>
                <div className="flex-1">{media?.node_id}</div>
              </div>
              <div className="text-xs flex flex-col lg:flex-row gap-y-2">
                <div className="w-20 font-medium">addr</div>
                <div className="flex-1">
                  <div className="line-clamp-1">{filterAddr(media?.addr)}</div>
                </div>
              </div>
              <div className="text-xs flex flex-col lg:flex-row gap-y-2">
                <div className="w-20 font-medium">conns</div>
                <div className="flex-1">
                  <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
                    {map(media?.conns, (connect, cIdx) => (
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
                  <div>{media?.cpu}</div>
                </Badge>
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>disk:</div>
                  <div>{media?.disk}</div>
                </Badge>
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>live:</div>
                  <div>{media?.live}</div>
                </Badge>
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>max:</div>
                  <div>{media?.max}</div>
                </Badge>
                <Badge variant="secondary" className="rounded w-fit gap-2">
                  <div>memory:</div>
                  <div>{media?.memory}</div>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
