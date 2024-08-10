'use client'

import { ZoneDetailCard } from '@/components'
import { useConsolesQuery } from '@/hooks'
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@packages/ui/components/index'
import { map } from 'lodash'

type Props = {
}

export const CreateZone: React.FC<Props> = () => {
  const { data: consoles } = useConsolesQuery({})
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          New Zone
        </Button>
      </SheetTrigger>
      <SheetContent className="md:!w-[600px] md:!max-w-none !w-full sm:w-[540px] p-0">
        <SheetHeader className="p-6">
          <SheetTitle>
            Seed address
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto h-[calc(100%-76px)] p-6 pt-0">
          {map(consoles?.data, (console) => (
            <ZoneDetailCard item={console} key={console?.node_id} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
