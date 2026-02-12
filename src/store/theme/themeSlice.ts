import { create } from 'zustand'
import { MenuTheme } from 'antd'
import { getCookie, setCookie } from '@/configs/cookies'
import { MENU__OPTION, THEME__OPTION } from './themeInitialState'

interface MenuOptionType {
  open: string[]
  select: string[]
}

interface ThemeState {
  currentTheme: MenuTheme
  collapsed: boolean
  menu: MenuOptionType

  // actions
  setTheme: (theme: MenuTheme) => void
  toggleCollapsed: () => void
  setSidebarMenu: (menu: MenuOptionType) => void
  setCollapsed: (value: boolean) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  /* ---------------- initial state ---------------- */
  currentTheme: (getCookie(THEME__OPTION) as MenuTheme) ?? 'light',
  collapsed: false,
  menu: (getCookie(MENU__OPTION) as MenuOptionType) ?? {
    select: [],
    open: []
  },

  /* ---------------- actions ---------------- */
  setTheme: (theme) => {
    set({ currentTheme: theme })
    setCookie(THEME__OPTION, theme)
  },

  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),

  setSidebarMenu: (menu) => {
    set({ menu })
    setCookie(MENU__OPTION, menu)
  },
  setCollapsed: (value: boolean) => set({ collapsed: value })
}))
