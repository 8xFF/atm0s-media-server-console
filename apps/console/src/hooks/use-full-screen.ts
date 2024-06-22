'use client'

import { useCallback, useEffect, useState } from 'react'

export const useFullScreen = () => {
  const [isMaximize, setIsMaximize] = useState(false)

  const detectFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      console.log('Fullscreen')
    } else {
      setIsMaximize(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('fullscreenchange', detectFullScreen)
    return () => {
      document.removeEventListener('fullscreenchange', detectFullScreen)
    }
  }, [detectFullScreen])

  const onOnOffFullScreen = () => {
    const el = document.getElementById('id--full-screen')
    if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsMaximize(false)
      return
    } else {
      el?.requestFullscreen()
      setIsMaximize(true)
    }
  }

  return { isMaximize, onOnOffFullScreen }
}
