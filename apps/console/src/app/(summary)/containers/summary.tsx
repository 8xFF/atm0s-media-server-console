'use client'

import { sumBy } from 'lodash'
import { useEffect, useState } from 'react'
import { Map } from 'react-map-gl'
import { Card, CardContent, CardHeader, CardTitle } from '@packages/ui/components/index'
import { Hash } from '@packages/ui/icons/index'
import { useTheme } from '@packages/ui/providers/index'
import { useZonesQuery } from '@/hooks'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2FvaGF2YW4iLCJhIjoiY2x5anNkcDBzMGw2bTJqcGF4OTNjbTk1dCJ9.quX_1lfj-fPC8hNzpwUWiA'

export const Summary = () => {
  const { theme } = useTheme()
  const [detectTheme, setDetectTheme] = useState<string>('light')
  const { data: zones } = useZonesQuery()

  const totalZones = zones?.data?.length
  const totalGateways = sumBy(zones?.data, 'gateways')
  const totalMedias = sumBy(zones?.data, 'medias')
  const totalConnectors = sumBy(zones?.data, 'connectors')
  const totalConsoles = sumBy(zones?.data, 'consoles')

  useEffect(() => {
    if (theme === 'system') {
      const classTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setDetectTheme(classTheme)
    } else {
      setDetectTheme(theme || 'light')
    }
  }, [theme])

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Zones</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalZones}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gateways</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGateways}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Medias</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMedias}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connectors</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConnectors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consoles</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsoles}</div>
          </CardContent>
        </Card>
      </div>
      <div className="rounded-lg overflow-hidden">
        <Map
          mapStyle={`mapbox://styles/mapbox/${detectTheme}-v10`}
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{
            height: 500,
          }}
          initialViewState={{
            zoom: 2,
          }}
        />
      </div>
    </div>
  )
}
