import React, { createContext, useContext, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'

const lightColors = {
  background: '#F7F7FA',
  card: '#FFFFFF',
  text: '#1C1C1E',
  subtext: '#6B6B75',
  border: '#E3E3E8',
  accent: '#3B5FE0',
  headerBackground: '#FFFFFF',
  headerText: '#1C1C1E',
  danger: '#D64545',
}

const darkColors = {
  background: '#121214',
  card: '#1D1D20',
  text: '#F2F2F5',
  subtext: '#A0A0AA',
  border: '#2C2C30',
  accent: '#7C93FF',
  headerBackground: '#1D1D20',
  headerText: '#F2F2F5',
  danger: '#FF6B6B',
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const scheme = useColorScheme() // 'light' | 'dark' | null

  const value = useMemo(() => {
    const dark = scheme === 'dark'
    const colors = dark ? darkColors : lightColors

    const navigationTheme = {
      ...(dark ? DarkTheme : DefaultTheme),
      colors: {
        ...(dark ? DarkTheme.colors : DefaultTheme.colors),
        background: colors.background,
        card: colors.headerBackground,
        text: colors.text,
        border: colors.border,
        primary: colors.accent,
      },
    }

    return {
      theme: { dark, colors },
      navigationTheme,
    }
  }, [scheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
