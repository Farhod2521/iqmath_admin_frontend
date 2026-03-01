import React from "react";
import HeaderHelp from "./HeaderHelp";

import { selectedAuthData, useStoreAuth, useThemeStore } from "@/store";
import { useSettingStore } from "@/store/settings/useSettingStore";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import HeaderMathMenu from "./HeaderMathMenu";

const Header = () => {
  const authUser = useStoreAuth(selectedAuthData);
  const { isSidebarOpen, setIsSidebarOpen } = useSettingStore();
  const { collapsed, toggleCollapsed } = useThemeStore();

  return (
    <div className="w-full bg-white  border-b-2 border-gray-200 flex p-2 pr-4">
      <div className={`w-full bg-white flex justify-between flex-wrap  `}>
        <button
          className=" cursor-pointer"
          onClick={toggleCollapsed}
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <AiOutlineMenuUnfold size={20} color="#6e8bb8" />
          ) : (
            <AiOutlineMenuFold size={20} color="#6e8bb8" />
          )}
        </button>
      </div>

      <div className="flex items-center justify-end gap-2">
        <HeaderMathMenu />
        <HeaderHelp />
        {/* <HeaderNotification /> */}
      </div>
    </div>
  );
};

export default Header;
