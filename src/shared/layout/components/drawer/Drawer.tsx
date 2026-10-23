import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer } from "antd";
import SidebarMenu from "../sidebar/SidebarMenu";
import DrawerProfile from "./DrawerProfile";
import { useThemeStore } from "@/store";
function DrawerWrapper() {
  const collapsed = useThemeStore((state) => state.collapsed);
  const theme = useThemeStore((state) => state.currentTheme);
  const setCollapsed = useThemeStore((state) => state.setCollapsed);
  const { pathname } = useLocation();

  // Telefonda menyudan sahifa tanlanganda drawer yopiladi
  useEffect(() => {
    setCollapsed(false);
  }, [pathname, setCollapsed]);
  // const collapsed = useAppSelector(selectCollapsed)
  // const dispatch = useAppDispatch()
  // const theme = useAppSelector(selectTheme)

  return (
    <Drawer
      placement="left"
      // width="80%"
      width="min(300px, 85vw)"
      open={collapsed}
      onClose={() => setCollapsed(!collapsed)}
      closable={false}
      styles={{ body: { padding: 0 } }}
    >
      <Layout.Sider
        collapsedWidth={0}
        trigger={null}
        theme="light"
        className={`cs-aside w-full! h-full max-w-none! transition-all ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <DrawerProfile />
        <div className="px-3 pt-2">
          <SidebarMenu collapsed={false} />
        </div>
      </Layout.Sider>
    </Drawer>
  );
}

export default DrawerWrapper;
