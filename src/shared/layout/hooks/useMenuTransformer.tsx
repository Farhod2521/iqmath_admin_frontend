import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@/shared/layout/libs";
import { PermissionsCode } from "@/shared/utils/menuPermissions";

export const useMenuTransformer = (navigate: (path: string) => void) => {
  const transformMenuData = (items: MenuItem[]): MenuProps["items"] =>
    items.map((item) => {
      const baseItem = {
        key: item.key!,
        icon: item.icon ? <item.icon /> : undefined,
      };

      if (item.children && item.children.length > 0) {
        return {
          ...baseItem,
          label: (
            <div
              className="w-full flex justify-between items-center cursor-pointer"
              onClick={() => item.path && navigate(item.path)}
            >
              <span className="py-3">{item.label}</span>
            </div>
          ),
          children: transformMenuData(item.children) ?? [],
        };
      }

      const isOffers = item.key === PermissionsCode.OFFERS.MENU;

      return {
        ...baseItem,
        label: (
          <NavLink
            to={item.path ?? "#"}
            className="w-full flex justify-between items-center"
          >
            <span className="py-3">{item.label}</span>
          </NavLink>
        ),
      };
    });

  return transformMenuData;
};
