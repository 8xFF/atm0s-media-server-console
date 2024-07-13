'use client'

import { TConnectorLogsEvents, TConnectorLogsPeers, TConnectorLogsRooms, TConnectorLogsSessions, TInputConnectorLogs } from './types'
import { useQuery } from '@packages/ui/providers/index'
import { useApi } from '@/hooks'

export * from './types'

export const useConnectorLogsRoomsQuery = ({ payload, options }: TInputConnectorLogs<TConnectorLogsRooms>) => {
  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.get(`/connector/${payload?.id}/log/rooms?page=${payload?.page}&limit=${payload?.limit}`)
    return rs.data
  }

  return useQuery({
    queryKey: ['useConnectorLogsRoomsQuery'],
    queryFn: fetcher,
    retry: false,
    refetchInterval: 30000,
    ...options,
  })
}

export const useConnectorLogsPeersQuery = ({ payload, options }: TInputConnectorLogs<TConnectorLogsPeers>) => {
  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.get(`/connector/${payload?.id}/log/peers?page=${payload?.page}&limit=${payload?.limit}`)
    return rs.data
  }

  return useQuery({
    queryKey: ['useConnectorLogsPeersQuery'],
    queryFn: fetcher,
    retry: false,
    refetchInterval: 30000,
    ...options,
  })
}

export const useConnectorLogsSessionsQuery = ({ payload, options }: TInputConnectorLogs<TConnectorLogsSessions>) => {
  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.get(`/connector/${payload?.id}/log/sessions?page=${payload?.page}&limit=${payload?.limit}`)
    return rs.data
  }

  return useQuery({
    queryKey: ['useConnectorLogsSessionsQuery'],
    queryFn: fetcher,
    retry: false,
    refetchInterval: 30000,
    ...options,
  })
}

export const useConnectorLogsEventsQuery = ({ payload, options }: TInputConnectorLogs<TConnectorLogsEvents>) => {
  const { api } = useApi()

  const fetcher = async () => {
    const rs = await api.get(`/connector/${payload?.id}/log/events?page=${payload?.page}&limit=${payload?.limit}`)
    return rs.data
  }

  return useQuery({
    queryKey: ['useConnectorLogsEventsQuery'],
    queryFn: fetcher,
    retry: false,
    refetchInterval: 30000,
    ...options,
  })
}
