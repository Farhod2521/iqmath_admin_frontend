import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type SettingState = {
  isSidebarOpen: boolean;
  titlePage: string;
  sidebarOpenKeys: string[];

  setTitlePage: (titlePage: string) => void;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setSidebarOpenKeys: (keys: string[]) => void;
};

export const useSettingStore = create<SettingState>()(
  devtools(
    persist(
      (set) => ({
        isSidebarOpen: true,
        titlePage: "Student",
        sidebarOpenKeys: [],

        setTitlePage: (titlePage) => set({ titlePage }),
        setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
        setSidebarOpenKeys: (sidebarOpenKeys) => set({ sidebarOpenKeys }),
      }),
      { name: "setting" },
    ),
  ),
);
