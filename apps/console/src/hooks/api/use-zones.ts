'use client'

import { useApi } from '..'
import { useQuery } from '@packages/ui/providers/index'

export type TZones = {
  data?: {
    connectors: number
    consoles: number
    gateways: number
    lat: number
    lon: number
    medias: number
    zone_id: number
  }[]
  error?: string
  status: boolean
}

export const useZonesQuery = () => {
  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.get('/cluster/zones')
    return rs.data as TZones
  }

  return useQuery({
    queryKey: ['useZonesQuery'],
    queryFn: fetcher,
    retry: false,
    refetchInterval: 60000,
  })
}

export type TZone = {
  data?: {
    connectors: any[]
    consoles: {
      addr: string
      conns: {
        addr: string
        node: number
        rtt_ms: number
      }[]
      cpu: number
      disk: number
      memory: number
      node_id: number
    }[]
    gateways: {
      addr: string
      conns: {
        addr: string
        node: number
        rtt_ms: number
      }[]
      cpu: number
      disk: number
      live: number
      max: number
      memory: number
      node_id: number
    }[]
    lat: number
    lon: number
    medias: {
      addr: string
      conns: {
        addr: string
        node: number
        rtt_ms: number
      }[]
      cpu: number
      disk: number
      live: number
      max: number
      memory: number
      node_id: number
    }[]
  }
  error?: string
  status: boolean
}

type TZonePayload = {
  id: number
}

export const useZoneQuery = (payload: TZonePayload) => {
  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.get(`/cluster/zones/${payload.id}`)
    return rs.data as TZone
  }

  return useQuery({
    queryKey: ['useZonesQuery'],
    queryFn: fetcher,
    retry: false,
    refetchInterval: 60000,
  })
}
