'use client'

import { useLogout } from '.'
import axios from 'axios'
import { getCookie } from '@packages/ui/lib/cookies'
import { env } from '@/config/env'

export const useApi = (url?: string) => {
  const { onLogout } = useLogout()
  const token = getCookie('token')

  const api = axios.create({
    baseURL: url || env.API_URL,
    headers: {
      'X-API-Key': token,
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error)
      } else {
        onLogout()
      }
    }
  )

  return { api, token }
}
