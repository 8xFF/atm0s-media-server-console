'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@packages/ui/components/index'
import { Hash } from '@packages/ui/icons/index'
import { Graph, MapPinSimpleArea } from '@phosphor-icons/react'
import { useZonesQuery } from '@/hooks'

export default function HomeScreen() {
  const { data: zones } = useZonesQuery()

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Zones</CardTitle>
          <MapPinSimpleArea className="h-4 w-4 text-muted-foreground font-medium" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{zones?.data?.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Nodes</CardTitle>
          <Graph className="h-4 w-4 text-muted-foreground font-medium" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">999</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Lives</CardTitle>
          <Hash className="h-4 w-4 text-muted-foreground font-medium" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">999</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Max</CardTitle>
          <Hash className="h-4 w-4 text-muted-foreground font-medium" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">999</div>
        </CardContent>
      </Card>
    </div>
  )
}
