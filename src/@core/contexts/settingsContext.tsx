'use client'

// React Imports
import type { ReactNode } from 'react'
import { createContext, useMemo, useState, useEffect } from 'react'

// Type Imports
import type { Mode, Skin, Layout, LayoutComponentWidth } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'
import primaryColorConfig from '@configs/primaryColorConfig'

// Utils
import { saveSettings } from '@/utils/settings'

// Settings type
export type Settings = {
  mode?: Mode
  skin?: Skin
  semiDark?: boolean
  layout?: Layout
  navbarContentWidth?: LayoutComponentWidth
  contentWidth?: LayoutComponentWidth
  footerContentWidth?: LayoutComponentWidth
  primaryColor?: string
}

// UpdateSettingsOptions type
type UpdateSettingsOptions = {
  updateCookie?: boolean
}

// SettingsContextProps type
type SettingsContextProps = {
  settings: Settings
  updateSettings: (settings: Partial<Settings>, options?: UpdateSettingsOptions) => void
  isSettingsChanged: boolean
  resetSettings: () => void
  updatePageSettings: (settings: Partial<Settings>) => () => void
}

type Props = {
  children: ReactNode
  settingsCookie: Settings | null
  mode?: Mode
}

// Initial Settings Context
export const SettingsContext = createContext<SettingsContextProps | null>(null)

// Settings Provider
export const SettingsProvider = (props: Props) => {
  // Initial Settings
  const initialSettings: Settings = {
    mode: themeConfig.mode,
    skin: themeConfig.skin,
    semiDark: themeConfig.semiDark,
    layout: themeConfig.layout,
    navbarContentWidth: themeConfig.navbar.contentWidth,
    contentWidth: themeConfig.contentWidth,
    footerContentWidth: themeConfig.footer.contentWidth,
    primaryColor: primaryColorConfig[0].main
  }

  const updatedInitialSettings = {
    ...initialSettings,
    mode: props.mode || themeConfig.mode
  }

  // State
  const [_settingsState, _updateSettingsState] = useState<Settings>(
    props.settingsCookie || updatedInitialSettings
  )

  const updateSettings = (settings: Partial<Settings>, options?: UpdateSettingsOptions) => {
    const { updateCookie = true } = options || {}

    _updateSettingsState(prev => {
      const newSettings = { ...prev, ...settings }

      // Update localStorage if needed
      if (updateCookie) {
        saveSettings(newSettings)
      }

      return newSettings
    })
  }

  /**
   * Updates the settings for page with the provided settings object.
   * Updated settings won't be saved to localStorage hence will be reverted once navigating away from the page.
   *
   * @param settings - The partial settings object containing the properties to update.
   * @returns A function to reset the page settings.
   *
   * @example
   * useEffect(() => {
   *     return updatePageSettings({ theme: 'dark' });
   * }, []);
   */
  const updatePageSettings = (settings: Partial<Settings>): (() => void) => {
    updateSettings(settings, { updateCookie: false })

    // Returns a function to reset the page settings
    return () => updateSettings(props.settingsCookie || updatedInitialSettings, { updateCookie: false })
  }

  const resetSettings = () => {
    updateSettings(initialSettings)
  }

  const isSettingsChanged = useMemo(
    () => JSON.stringify(initialSettings) !== JSON.stringify(_settingsState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_settingsState]
  )

  // Sync settings to localStorage when they change
  useEffect(() => {
    saveSettings(_settingsState)
  }, [_settingsState])

  return (
    <SettingsContext.Provider
      value={{
        settings: _settingsState,
        updateSettings,
        isSettingsChanged,
        resetSettings,
        updatePageSettings
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  )
}