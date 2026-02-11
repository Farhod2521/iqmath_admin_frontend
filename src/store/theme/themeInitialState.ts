import { getLocalStorage } from '@/utils/localStorge'
import { MenuTheme } from 'antd'
export const MENU__OPTION = '@yeraksiyamenu'
export const THEME__OPTION = '@theme'

interface ThemeInitialState {
  currentTheme: MenuTheme
  collapsed: boolean
  menu: {
    select: string[]
    open: string[]
  }
}

export const initialState: ThemeInitialState = {
  currentTheme: getLocalStorage(THEME__OPTION) || 'light',
  collapsed: false,
  menu: getLocalStorage(MENU__OPTION)
}
