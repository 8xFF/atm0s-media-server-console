'use client'

import { DefinedInitialDataOptions } from '@packages/ui/providers/index'

export type TDataConnectorLogsRooms = {
  id: number
  room: string
}

export type TConnectorLogsRooms = {
  data?: TDataConnectorLogsRooms[]
  error?: string
  status: boolean
}

export type TDataConnectorLogsPeers = {
  created_at: number
  id: number
  peer: string
  room: string
  room_id: number
  sessions: {
    created_at: number
    id: number
    joined_at: number
    leaved_at?: number
    peer: string
    peer_id: number
    session: string
  }[]
}

export type TConnectorLogsPeers = {
  data?: TDataConnectorLogsPeers[]
  error?: string
  status: boolean
}

export type TDataConnectorLogsSessions = {
  created_at: number
  id: string
  ip?: string
  sdk: any
  user_agent: any
  sessions: {
    created_at: number
    id: number
    joined_at: number
    leaved_at?: number
    peer: string
    peer_id: number
    session: string
  }[]
}

export type TConnectorLogsSessions = {
  data?: TDataConnectorLogsSessions[]
  error?: string
  status: boolean
}

export type TDataConnectorLogsEvents = {
  created_at: number
  event: string
  id: number
  meta: string
  node: number
  node_ts: number
  session: string
}

export type TConnectorLogsEvents = {
  data?: TDataConnectorLogsEvents[]
  error?: string
  status: boolean
}

export type TInputConnectorLogs<T> = {
  payload: {
    id?: string | null
    page?: number
    limit?: number
  }
  options?: Omit<DefinedInitialDataOptions<T>, 'initialData' | 'queryKey'>
}
