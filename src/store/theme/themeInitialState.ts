import { getCookie } from "@/configs/cookies";
import { MenuTheme } from "antd";

export const MENU__OPTION = "@iqmathmenu";
export const THEME__OPTION = "@theme";

export interface ThemeInitialState {
  currentTheme: MenuTheme;
  collapsed: boolean;
  menu: {
    select: string[];
    open: string[];
  };
}

const DEFAULT_MENU: ThemeInitialState["menu"] = { select: [], open: [] };

export const initialState: ThemeInitialState = {
  currentTheme: (getCookie(THEME__OPTION) as MenuTheme) || "light",
  collapsed: false,
  menu: (getCookie(MENU__OPTION) as ThemeInitialState["menu"]) || DEFAULT_MENU,
};
