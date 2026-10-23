// SidebarMenu.tsx
import { Menu, MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getMenus, MenuItem } from "@/shared/layout/libs/menus";
import { useMenuTransformer } from "../../hooks/useMenuTransformer";
import {
  findActiveMenuKey,
  findParentKeys,
  insertChildrenByKey,
} from "../../utils/menuUtils";
import { PermissionsCode } from "@/shared/utils/menuPermissions";
import { useTranslation } from "react-i18next";

const TARGET_PARENT_KEY = PermissionsCode.PROPERTY.MENU;

type Props = {
  collapsed: boolean;
};

const SidebarMenu = ({ collapsed }: Props) => {
  const { t, i18n } = useTranslation();
  const menus = useMemo(() => getMenus(t), [i18n.language]);

  const navigate = useNavigate();
  const location = useLocation();
  const transformMenuData = useMenuTransformer(navigate, collapsed);

  const [baseMenus, setBaseMenus] = useState<MenuItem[]>(menus);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => setBaseMenus(menus), [menus]);

  useEffect(() => {
    setBaseMenus(
      (prev) => insertChildrenByKey(prev, TARGET_PARENT_KEY) as MenuItem[],
    );
  }, []);

  // collapsed bo‘lsa openKeys ni yopib qo‘yamiz (label ko‘rinishini ham kamaytiradi)
  useEffect(() => {
    if (collapsed) setOpenKeys([]);
  }, [collapsed]);

  useEffect(() => {
    const activeKey = findActiveMenuKey(baseMenus as any, location.pathname);
    if (activeKey) {
      setSelectedKeys([activeKey]);
      const parents = findParentKeys(baseMenus as any, activeKey);
      setOpenKeys(collapsed ? [] : parents);
    } else {
      setSelectedKeys([]);
    }
  }, [location.pathname, baseMenus, collapsed]);

  const menuData: MenuProps["items"] = useMemo(() => {
    return transformMenuData(baseMenus as any);
  }, [baseMenus, transformMenuData]);

  return (
    <Menu
      mode="inline"
      className="sidebar_menu"
      selectedKeys={selectedKeys}
      openKeys={collapsed ? [] : openKeys}
      onOpenChange={(keys) => !collapsed && setOpenKeys(keys)}
      inlineCollapsed={collapsed}
      style={{ borderRight: 0 }}
      items={menuData}
    />
  );
};

export default SidebarMenu;
