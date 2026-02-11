import { Menu, Skeleton } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { menus } from "@/router/routes";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectUserMe, selectUserPermission } from "@/store/auth/authSlice";
import { useEffect, useState } from "react";
import { Item, MenuItem } from "@/router/index.d";
import {
  selectCollapsed,
  selectSidebarMenu,
  selectTheme,
  setSidebarMenu,
} from "@/store/theme/themeSlice";
import { setAreaReload } from "@/store/dashboard/areaSlice";
// import { getCommonSidebar } from "@/http";
import { countShowKeys, staticPermissions } from "@/constants/user";

function SidebarMenu() {
  const navigate = useNavigate();
  const collapsed = useAppSelector(selectCollapsed);
  const dispatch = useAppDispatch();
  const permissions = useAppSelector(selectUserPermission);
  const sidebarMenu = useAppSelector(selectSidebarMenu);
  const theme = useAppSelector(selectTheme);
  const userData = useAppSelector(selectUserMe);
  const [countsMap, setCountsMap] = useState<Record<string, number>>({}); // key -> count

  const handleNavigate = (item: any) => {
    const { path } = item;

    if (path.includes("http")) {
      window.open(path, "_blank");
    } else if (path.includes("areas")) {
      navigate(`/areas/${item.key}`);
    } else if (path.includes("applications")) {
      navigate(`/applications/${item.key}`);
    } else navigate(path);
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item?: any,
  ) => {
    e.preventDefault();
    if (item?.path) {
      handleNavigate(item);
    }
  };

  const handleClickItem: MenuProps["onClick"] = (item) => {
    dispatch(setSidebarMenu({ open: item.keyPath, select: item.key }));
    if (item.key === "menu:dashboard" || item.key === "menu:property")
      dispatch(setAreaReload());
  };

  const [menuData, setMenuData] = useState<any>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);

  const getApplicationStatuses = () => {
    setIsLoadingMenu(true);

    // getCommonSidebar()
    //   .then((res: any) => {
    //     const {
    //       propertyDraftCount,
    //       propertyStateCounts,
    //       propertyNoGripStateCount,
    //       propertyStatusCounts,
    //       propertyNoConstructionStateCount,
    //       propertyRetirementStateCount,
    //       propertyStateOwnedSateCount,
    //       propertyNotRegisteredCount,
    //       propertyReceiveDecisionRegisteredCount: {
    //         isNotRegisteredCount,
    //         isRegisteredCount,
    //       },
    //     } = res;

    //     /*----------- status count start -------------------- */
    //     const statusList = propertyStatusCounts.map((item: any) => ({
    //       code: `aplications_${item.id}`,
    //       count: item.count,
    //     }));
    //     const statusCount = statusList.reduce((a: number, b: any) => {
    //       a += Number(b.count);
    //       return a;
    //     }, 0);
    //     const statusAll = { code: "aplications_all", count: statusCount };
    //     /*----------- status count end -------------------- */

    //     /* ---------- status yakunlangan start -------------- */
    //     const statusRegistered = [
    //       { code: "aplications_registered", count: isRegisteredCount },
    //       { code: "aplications_unregistered", count: isNotRegisteredCount },
    //     ];
    //     /* ---------- status yakunlangan end -------------- */

    //     /*----------- state count start -------------------- */

    //     const stateAllCount = propertyStateCounts.reduce(
    //       (a: number, b: any) => {
    //         if (b.code === "before_start_date_pg") {
    //           return a;
    //         }
    //         a += Number(b.count);
    //         return a;
    //       },
    //       0,
    //     );

    //     const stateAll = { code: "area_all", count: stateAllCount };

    //     /*----------- state count end -------------------- */

    //     /*----------- draft count start -------------------- */

    //     const draftObj = {
    //       code: "menu:missing_area",
    //       count: propertyDraftCount,
    //     };

    //     /*----------- draft count end -------------------- */

    //     /*----------- not count start -------------------- */
    //     const notObj = {
    //       code: "no_grip_count",
    //       count: propertyNoGripStateCount,
    //     };
    //     const notConstruction = {
    //       code: "menu:construction",
    //       count: propertyNoConstructionStateCount,
    //     };
    //     const propertyRetirement = {
    //       code: "written_off:menu",
    //       count: propertyRetirementStateCount,
    //     };

    //     const propertyStateOwneds = {
    //       code: "state-owneds:menu",
    //       count: propertyStateOwnedSateCount,
    //     };

    //     const propertyStateNotRegistered = {
    //       code: "not_registered:menu",
    //       count: propertyNotRegisteredCount,
    //     };

    //     // const propertyStateNoStayCaptures = {
    //     //   code: 'no_stay_captures:menu',
    //     //   count: propertyNoStayCaptureCount
    //     // }
    //     /*----------- not count end -------------------- */

    //     const countList = [
    //       ...statusList,
    //       statusAll,
    //       ...propertyStateCounts,
    //       stateAll,
    //       draftObj,
    //       notObj,
    //       notConstruction,
    //       propertyRetirement,
    //       propertyStateOwneds,
    //       propertyStateNotRegistered,
    //       ...statusRegistered,
    //       // propertyStateNoStayCaptures
    //     ].reduce((map, item) => {
    //       map[item.code] = item.count;
    //       return map;
    //     }, {});

    //     //

    //     const removedPermissions = [
    //       "was_send_inspection",
    //       "has_failed_returned_from_inspection",
    //       "not_registered:menu",
    //     ];
    //     const filterStaticPermissions = staticPermissions.filter(
    //       (i) => !removedPermissions.includes(i),
    //     );
    //     const switchPermissions =
    //       userData?.id == "142" ? filterStaticPermissions : staticPermissions;

    //     const filterMenu = filterData(menus, [
    //       ...permissions,
    //       ...switchPermissions,
    //     ]);
    //     const updateMenu = addCountsToMenu(filterMenu, countList);

    //     const menuItems = transformMenuData(updateMenu);
    //     setMenuData(menuItems);
    //   })
    //   .finally(() => setIsLoadingMenu(false));
    try {
      // setCountsMap({ aplications_all: 12, 'menu:missing_area': 3, ... })
      console.log("menus", menus);

      const filterMenu = filterData(menus, [...staticPermissions]);
      const updateMenu = addCountsToMenu(filterMenu, 22);
      const menuItems = transformMenuData(updateMenu);

      setMenuData(menuItems);
    } finally {
      setIsLoadingMenu(false);
    }
  };

  useEffect(() => {
    getApplicationStatuses();
  }, []);

  const transformMenuData = (items: any) => {
    return items.map((item: any) => {
      if (item.children && item.children.length > 0) {
        return {
          key: item.key,
          icon: item.icon ? <item.icon /> : undefined,
          label: item.label,
          children: transformMenuData(item.children),
        };
      } else if (
        item.key === "aplications_9" &&
        !permissions.includes("filter:send_conclusion")
      ) {
        return null;
      } else {
        return {
          path: item.path,
          key: item.key,
          label: (
            <a
              href={item.path}
              onClick={(e) => handleItemClick(e, item)}
              className="flex items-center justify-between w-full"
            >
              <span>{item.label}</span>
              {countShowKeys.includes(item.key) && (
                <span className="px-2 text-xs py-1 bg-[#1ea8e7] leading-none text-white rounded-full">
                  {item.count && item.count}
                </span>
              )}
            </a>
          ),
          icon: item.icon && <item.icon />,
        };
      }
    });
  };

  if (isLoadingMenu) return <Skeleton />;

  console.log("menuData", menuData);
  return (
    <Menu
      theme={theme}
      className="layout__menu"
      mode={"inline"}
      selectedKeys={sidebarMenu && sidebarMenu.select}
      defaultOpenKeys={sidebarMenu && sidebarMenu.open}
      onClick={handleClickItem}
      items={menuData}
    />
  );
}

export default SidebarMenu;

function filterData(data: MenuItem[], datafilter: string[]) {
  return data.reduce((acc: Item[], item: MenuItem) => {
    if (item.key && datafilter.includes(item.key)) {
      const newItem = { ...item };
      if (item.children) {
        newItem.children = filterData(item.children, datafilter);
      }
      acc.push(newItem);
    }
    return acc;
  }, []);
}

function addCountsToMenu(menuItems: any, countsMap: any) {
  return menuItems.map((item: any) => {
    // Elementning nusxasini yaratish (original ma'lumotni o'zgartirmaslik uchun)
    const newItem = { ...item };

    // Agar elementning 'key' si 'countsMap' da mavjud bo'lsa, 'count' qo'shish
    if (newItem.key && countsMap.hasOwnProperty(newItem.key)) {
      newItem.count = countsMap[newItem.key];
    }

    // Agar elementda 'children' mavjud bo'lsa, ularni ham qayta ishlash
    if (newItem.children && Array.isArray(newItem.children)) {
      newItem.children = addCountsToMenu(newItem.children, countsMap);
    }

    return newItem;
  });
}
