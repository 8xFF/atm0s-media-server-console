'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@packages/ui/components/index'
import { SignalIcon } from '@packages/ui/icons/index'
import { TDataZone } from '@/hooks'

type Props = {
  zone: TDataZone
}

export const ZoneItem: React.FC<Props> = ({ zone }) => {
  const router = useRouter()
  return (
    <Card className="cursor-pointer" onClick={() => router.push(`/zone/detail?zone_id=${zone?.zone_id}`)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-0">
        <CardTitle className="text-sm font-medium">zone_id: {zone?.zone_id}</CardTitle>
        <SignalIcon className="text-emerald-500" size={16} />
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid gap-2">
          <div className="text-sm text-muted-foreground flex items-center justify-between">
            <div>consoles</div>
            <div>{zone?.consoles}</div>
          </div>
          <div className="text-sm text-muted-foreground flex items-center justify-between">
            <div>gateways</div>
            <div>{zone?.gateways}</div>
          </div>
          <div className="text-sm text-muted-foreground flex items-center justify-between">
            <div>medias</div>
            <div>{zone?.medias}</div>
          </div>
          <div className="text-sm text-muted-foreground flex items-center justify-between">
            <div>connectors</div>
            <div>{zone?.connectors}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
