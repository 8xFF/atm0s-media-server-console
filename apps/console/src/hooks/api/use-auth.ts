'use client'

import { useApi } from '..'
import { useMutation } from '@packages/ui/providers/index'

type TLoginMutationPayload = {
  secret: string
}

export type TLoginResponse = {
  data?: {
    token: string
  }
  error?: string
  status: boolean
}

export const useLoginMutation = () => {
  const { api } = useApi()

  const fetcher = async (payload: TLoginMutationPayload) => {
    const rs = await api.post('/user/user/login', {
      ...payload,
    })
    return rs.data as TLoginResponse
  }

  return useMutation({
    mutationFn: fetcher,
    retry: false,
  })
}
