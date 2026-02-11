import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectCollapsed, toggleCollapsed } from "@/store/theme/themeSlice";
import { Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import { selectUserAuth } from "@/store/auth/authSlice";
// import NavbarNotification from './NavbarNotification'

import { useState } from "react";
import NavbarSetting from "./NavbarSetting";
import NavbarSettingDrawer from "./NavbarSettingDrawer";
import NavbarOnlineUsers from "./NavbarOnlineUsers";

function Navbar() {
  const collapsed = useAppSelector(selectCollapsed);
  const dispatch = useAppDispatch();
  const authUser = useAppSelector<any>(selectUserAuth);

  const [visible, setVisible] = useState(false);
  const openSetting = () => setVisible(true);
  const closeSetting = () => setVisible(false);

  return (
    <div className="flex justify-between items-center relative w-full text-black text-opacity-60 ">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(toggleCollapsed())}
      />
      <NavbarOnlineUsers />
      {/* <NavbarAttention /> */}

      {/* <NavbarNotification /> */}
      <NavbarSetting onSetting={openSetting} />
      <NavbarSettingDrawer onSetting={closeSetting} isSetting={visible} />
    </div>
  );
}

export default Navbar;
