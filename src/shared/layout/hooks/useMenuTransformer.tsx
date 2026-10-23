import { MenuProps, Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@/shared/layout/libs";
import { PermissionsCode } from "@/shared/utils/menuPermissions";

// collapsed — faqat ikonka ko'rinishi (desktop sidebar yig'ilganda); telefondagi drawer'da doim false
export const useMenuTransformer = (
  navigate: (path: string) => void,
  collapsed = false,
) => {

  const renderLabel = (label: string) => {
    if (collapsed) {
      return (
        <Tooltip title={label} placement="right">
          {/* <span className="py-3">{label}</span> */}
        </Tooltip>
      );
    }

    return <span className="py-3">{label}</span>;
  };

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
              {/* <span className="py-3">{item.label}</span> */}
              {renderLabel(item.label)}
            </div>
          ),
          children: transformMenuData(item.children) ?? [],
        };
      }

      return {
        ...baseItem,
        label: (
          <NavLink
            to={item.path ?? "#"}
            className="w-full flex justify-between items-center"
          >
            {/* <span className="py-3">{item.label}</span> */}
            {renderLabel(item.label)}
          </NavLink>
        ),
      };
    });

  return transformMenuData;
};
