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
import { getModules } from "@/services";
// import { useStoreAuth, useStoreUsers } from "@/store";

import { PermissionsCode } from "@/shared/utils/menuPermissions";
import { useSettingStore } from "@/store/settings/useSettingStore";
import { useTranslation } from "react-i18next";

const TARGET_PARENT_KEY = PermissionsCode.PROPERTY.MENU;

const SidebarMenu = () => {
  // const { userData } = useStoreUsers();
  const { t, i18n } = useTranslation(); // ✅ i18n ham olamiz

  const menus = useMemo(() => getMenus(t), [i18n.language]);

  const navigate = useNavigate();
  const location = useLocation();
  const transformMenuData = useMenuTransformer(navigate);

  const [baseMenus, setBaseMenus] = useState<MenuItem[]>(menus);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    setBaseMenus(menus);
  }, [menus]);
  // API'dan kelgan modullarni "menu:property" childreniga qo'shish
  useEffect(() => {
    let cancelled = false;

    const loadAndMergeModules = async () => {
      try {
        setBaseMenus(
          (prev) => insertChildrenByKey(prev, TARGET_PARENT_KEY) as MenuItem[],
        );
      } catch (err) {
        // ixtiyoriy: logger/toast
        console.error("Failed to load modules for sidebar:", err);
      }
    };

    loadAndMergeModules();
    return () => {
      cancelled = true;
    };
  }, []);

  // Route o'zgarganda active hamda open keys ni yangilash
  useEffect(() => {
    const activeKey = findActiveMenuKey(baseMenus as any, location.pathname);
    if (activeKey) {
      setSelectedKeys([activeKey]);
      const parents = findParentKeys(baseMenus as any, activeKey);
      setOpenKeys(parents);
    } else {
      setSelectedKeys([]);
    }
  }, [location.pathname, baseMenus]);

  // AntD'ga mos "items"
  const menuData: MenuProps["items"] = useMemo(() => {
    // const filterDataList = baseMenus.filter((i) =>
    //   userData?.permissions.includes(i.key),
    // );
    const filterDataList = baseMenus;

    return transformMenuData(filterDataList as any);
  }, [baseMenus, transformMenuData]);

  return (
    <Menu
      mode="inline"
      className="sidebar_menu"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      // openKeys={sidebarOpenKeys}
      // onOpenChange={setSidebarOpenKeys}
      onOpenChange={setOpenKeys}
      style={{ borderRight: 0 }}
      items={menuData}
    />
  );
};

export default SidebarMenu;
