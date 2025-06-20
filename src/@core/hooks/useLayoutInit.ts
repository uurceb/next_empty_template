'use client'

// React Imports
import { useEffect } from 'react'

// Hook Imports
import { useMedia } from 'react-use'

// Type Imports
import { useSettings } from '@core/hooks/useSettings'

const useLayoutInit = (colorSchemeFallback: 'light' | 'dark') => {
  // Hooks
  const { settings, updateSettings } = useSettings()
  const isDark = useMedia('(prefers-color-scheme: dark)', colorSchemeFallback === 'dark')

  useEffect(() => {
    if (settings.mode === 'system') {
      // We need to update settings when system preference changes
      const appMode = isDark ? 'dark' : 'light'
      // Note: In React app, we don't need to set cookies, just update settings
      updateSettings({ mode: appMode })
    }
  }, [isDark, settings.mode, updateSettings])

  // This hook does not return anything as it is only used to initialize settings on first load
}

export default useLayoutInit