import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, MENU__OPTION, THEME__OPTION } from './themeInitialState'
import { setLocalStorge } from '@/utils/localStorge'
import { MenuTheme } from 'antd'

interface MenuOptionType {
  open: string[]
  select: string
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<MenuTheme>) => {
      state.currentTheme = action.payload
      setLocalStorge(THEME__OPTION, action.payload)
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed // Toggle the collapsed state
    },
    setSidebarMenu: (state, action) => {
      state.menu = action.payload
      setLocalStorge<MenuOptionType>(MENU__OPTION, action.payload)
    }
  }
})

export const { setTheme, toggleCollapsed, setSidebarMenu } = themeSlice.actions

export const selectTheme = (state: { theme: { currentTheme: MenuTheme } }) => state.theme.currentTheme
export const selectCollapsed = (state: { theme: { collapsed: boolean } }) => state.theme.collapsed
export const selectSidebarMenu = (state: { theme: { menu: { select?: string[]; open: string[] } } }) => state.theme.menu

export default themeSlice.reducer
