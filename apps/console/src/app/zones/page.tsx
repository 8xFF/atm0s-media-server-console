'use client'

import { map } from 'lodash'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@packages/ui/components/index'
import { useZonesQuery } from '@/hooks'

export default function ZonesScreen() {
  const { data: zones } = useZonesQuery()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {map(zones?.data, (zone) => (
        <Card key={zone?.zone_id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              <Badge className="rounded">Zone ID: {zone?.zone_id}</Badge>
            </CardTitle>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="text-xs text-emerald-500">Good</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Gateways</div>
                <div className="text-sm text-muted-foreground">{zone?.gateways}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Medias</div>
                <div className="text-sm text-muted-foreground">{zone?.medias}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Connectors</div>
                <div className="text-sm text-muted-foreground">{zone?.connectors}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Consoles</div>
                <div className="text-sm text-muted-foreground">{zone?.consoles}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Lat</div>
                <div className="text-sm text-muted-foreground">{zone?.lat}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Lon</div>
                <div className="text-sm text-muted-foreground">{zone?.lon}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
