import React from "react";
import HeaderHelp from "./HeaderHelp";

import { selectedAuthData, useStoreAuth } from "@/store";
import { useSettingStore } from "@/store/settings/useSettingStore";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import HeaderMathMenu from "./HeaderMathMenu";

const Header = () => {
  const authUser = useStoreAuth(selectedAuthData);
  const { isSidebarOpen, setIsSidebarOpen } = useSettingStore();

  return (
    <div className="w-full bg-white  border-b-2 border-gray-200 flex p-2 pr-4">
      <div className={`w-full bg-white flex justify-between flex-wrap  `}>
        <button
          className=" cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <AiOutlineMenuFold size={20} />
          ) : (
            <AiOutlineMenuUnfold size={20} />
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
