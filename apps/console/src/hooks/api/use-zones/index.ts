'use client'

import { TZoneInput, TZonesInput } from './types'
import { useQuery } from '@packages/ui/providers/index'
import { useApi } from '@/hooks'

export * from './types'

export const useZonesQuery = (input?: TZonesInput) => {
  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.get('/cluster/zones')
    return rs.data
  }

  return useQuery({
    queryKey: ['useZonesQuery'],
    queryFn: fetcher,
    retry: false,
    refetchInterval: 60000,
    ...input?.options,
  })
}

export const useDetailZoneQuery = ({ payload, options }: TZoneInput) => {
  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.get(`/cluster/zones/${payload.id}`)
    return rs.data
  }

  return useQuery({
    queryKey: ['useZoneQuery'],
    queryFn: fetcher,
    retry: false,
    refetchInterval: 60000,
    ...options,
  })
}
