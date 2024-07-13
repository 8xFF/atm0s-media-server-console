'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@packages/ui/components/index'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { LogsEvents, LogsPeers, LogsRooms, LogsSessions } from '../components'

dayjs.extend(LocalizedFormat)

export const ZoneLogs = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('connector_id')

  if (!id) redirect('/zone/list')

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="rooms">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rooms" className="capitalize">rooms</TabsTrigger>
          <TabsTrigger value="peers" className="capitalize">peers</TabsTrigger>
          <TabsTrigger value="sessions" className="capitalize">sessions</TabsTrigger>
          <TabsTrigger value="events" className="capitalize">events</TabsTrigger>
        </TabsList>
        <TabsContent value="rooms">
          <LogsRooms />
        </TabsContent>
        <TabsContent value="peers">
          <LogsPeers />
        </TabsContent>
        <TabsContent value="sessions">
          <LogsSessions />
        </TabsContent>
        <TabsContent value="events">
          <LogsEvents />
        </TabsContent>
      </Tabs>
    </div>
  )
}
