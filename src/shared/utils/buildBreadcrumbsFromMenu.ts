import { MenuItem } from "@/shared/layout/libs/menus";

export type BreadcrumbItem = {
  title: string;
  link?: string;
};

const isMatch = (menuPath?: string, pathname?: string) => {
  if (!menuPath || !pathname) return false;

  return menuPath === pathname || pathname.startsWith(menuPath + "/");
};

export const buildBreadcrumbsFromMenu = (
  menus: MenuItem[],
  pathname: string,
  t?: (key: string) => string,
): BreadcrumbItem[] => {
  const result: BreadcrumbItem[] = [];

  const dfs = (items: MenuItem[], parents: BreadcrumbItem[]): boolean => {
    for (const item of items) {
      const label =
        typeof item.label === "string" ? item.label : String(item.label);

      const title = t ? t(label) : label;

      const current: BreadcrumbItem = {
        title,
        link: item.path,
      };

      const newPath = item.path
        ? [...parents, current]
        : [...parents, { title }];

      // ✅ MATCH FIXED HERE
      if (item.path && isMatch(item.path, pathname)) {
        result.push(...newPath);
        return true;
      }

      if (item.children?.length) {
        const found = dfs(item.children, newPath);
        if (found) return true;
      }
    }

    return false;
  };

  dfs(menus, []);

  return result;
};
