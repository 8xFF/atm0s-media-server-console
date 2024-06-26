'use client'

import { DefinedInitialDataOptions } from '@packages/ui/providers/index'

export type TDataZone = {
  connectors: number
  consoles: number
  gateways: number
  lat: number
  lon: number
  medias: number
  zone_id: number
}

export type TZones = {
  data?: TDataZone[]
  error?: string
  status: boolean
}

export type TZonesInput = {
  options?: Omit<DefinedInitialDataOptions<TZones>, 'initialData' | 'queryKey'>
}

export type TDataDetailZoneConns = {
  addr: string
  node: number
  rtt_ms: number
}

export type TDataDetailZoneCommon = {
  addr: string
  conns: TDataDetailZoneConns[]
  cpu: number
  disk: number
  memory: number
  node_id: number
}

export type TDataDetailZoneConsole = TDataDetailZoneCommon

export type TDataDetailZoneGateway = {
  live: number
  max: number
} & TDataDetailZoneCommon

export type TDataDetailZoneMedia = {
  live: number
  max: number
} & TDataDetailZoneCommon

export type TDataDetailZone = {
  connectors: any[]
  consoles: TDataDetailZoneConsole[]
  gateways: TDataDetailZoneGateway[]
  medias: TDataDetailZoneMedia[]
  lat: number
  lon: number
}

export type TZone = {
  data?: TDataDetailZone
  error?: string
  status: boolean
}

export type TZoneInput = {
  payload: {
    id?: string | null
  }
  options?: Omit<DefinedInitialDataOptions<TZone>, 'initialData' | 'queryKey'>
}
