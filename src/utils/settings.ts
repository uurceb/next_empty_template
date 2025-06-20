// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { Mode, SystemMode } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'
import primaryColorConfig from '@configs/primaryColorConfig'

export const getInitialSettings = (): Settings => {
  const defaultSettings: Settings = {
    mode: themeConfig.mode,
    skin: themeConfig.skin,
    semiDark: themeConfig.semiDark,
    layout: themeConfig.layout,
    navbarContentWidth: themeConfig.navbar.contentWidth,
    contentWidth: themeConfig.contentWidth,
    footerContentWidth: themeConfig.footer.contentWidth,
    primaryColor: primaryColorConfig[0].main
  }

  try {
    const stored = localStorage.getItem(themeConfig.settingsCookieName)
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.warn('Failed to parse stored settings:', error)
  }

  return defaultSettings
}

export const getInitialMode = (): Mode => {
  try {
    const stored = localStorage.getItem(themeConfig.settingsCookieName)
    if (stored) {
      const settings = JSON.parse(stored)
      return settings.mode || themeConfig.mode
    }
  } catch (error) {
    console.warn('Failed to parse stored mode:', error)
  }

  return themeConfig.mode
}

export const getInitialSystemMode = (): SystemMode => {
  const mode = getInitialMode()
  
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  
  return mode as SystemMode
}

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(themeConfig.settingsCookieName, JSON.stringify(settings))
  } catch (error) {
    console.warn('Failed to save settings:', error)
  }
}