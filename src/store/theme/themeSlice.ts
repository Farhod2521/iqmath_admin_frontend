import { create } from "zustand";
import { MenuTheme } from "antd";
import { getCookie, setCookie } from "@/configs/cookies";
import { THEME__OPTION } from "./themeInitialState";

interface ThemeState {
  currentTheme: MenuTheme;
  collapsed: boolean;
  theme: string;

  // actions
  setTheme: (theme: MenuTheme) => void;
  toggleCollapsed: () => void;
  setCollapsed: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  /* ---------------- initial state ---------------- */
  currentTheme: (getCookie(THEME__OPTION) as MenuTheme) ?? "light",
  collapsed: false,
  theme: "ligt",
  /* ---------------- actions ---------------- */
  setTheme: (theme) => {
    set({ currentTheme: theme });
    setCookie(THEME__OPTION, theme);
  },

  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setCollapsed: (value: boolean) => set({ collapsed: value }),
}));
