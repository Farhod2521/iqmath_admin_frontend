import { Layout } from "antd";
import SidebarHeader from "./SidebarHeader";
import SidebarProfile from "./SidebarProfile";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";
import { selectedUserData, useStoreUsers, useThemeStore } from "@/store";

const { Sider } = Layout;

const SiderMenu = () => {
  const userData = useStoreUsers(selectedUserData);
  const { collapsed, toggleCollapsed } = useThemeStore();

  const hasRegionAndDistrict = !!(userData?.region && userData?.districts);
  const sidebarHeight = hasRegionAndDistrict
    ? "h-[calc(-305px+100vh)]"
    : "h-[calc(-105px+100vh)]";

  return (
    <Sider
      className="sidebar relative"
      width={280}
      onCollapse={toggleCollapsed}
      trigger={null}
      collapsible
      theme="light"
      collapsed={collapsed}
    >
      <SidebarHeader />

      {/* <SidebarProfile userData={userData} /> */}

      {/* h-[calc(-286px+100vh)] */}
      <div className={`sidebar_blok ${sidebarHeight}  px-3 `}>
        <SidebarMenu collapsed={collapsed} />
      </div>
      <div className="w-full bottom-1 absolute border-t border-gray-300/30">
        <SidebarFooter />
      </div>
    </Sider>
  );
};

export default SiderMenu;
