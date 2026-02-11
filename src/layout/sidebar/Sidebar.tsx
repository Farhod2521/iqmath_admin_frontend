import { Layout } from "antd";
import { useAppSelector } from "@/hooks/useRedux";
import { selectCollapsed, selectTheme } from "@/store/theme/themeSlice";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";
import SidebarProfile from "./SidebarProfile";

const { Sider } = Layout;

function SiderMenu() {
  const collapsed = useAppSelector(selectCollapsed);
  const theme = useAppSelector(selectTheme);

  return (
    <Sider
      width={290}
      trigger={null}
      collapsible
      theme={theme}
      collapsed={collapsed}
      className="cs-aside"
    >
      <SidebarHeader />
      <SidebarProfile />
      <SidebarMenu />
      <SidebarFooter />
    </Sider>
  );
}

export default SiderMenu;
