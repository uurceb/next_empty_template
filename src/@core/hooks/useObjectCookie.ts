// React Imports
import { useMemo, useCallback } from 'react'

// Utils
import { saveSettings } from '@/utils/settings'

export const useObjectCookie = <T>(key: string, fallback?: T | null): [T, (newVal: T) => void] => {
  // Get value from localStorage
  const value = useMemo<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : fallback
    } catch (error) {
      console.warn('Failed to parse stored value:', error)
      return fallback
    }
  }, [key, fallback])

  const updateValue = useCallback((newVal: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(newVal))
      // If this is settings, also save using the settings utility
      if (key.includes('settings') || key.includes('materialize')) {
        saveSettings(newVal as any)
      }
    } catch (error) {
      console.warn('Failed to save value:', error)
    }
  }, [key])

  return [value, updateValue]
}