import { MenuItem } from "@/shared/layout/libs";

// Joriy route bo'yicha active menu item topish
export const findActiveMenuKey = (
  items: MenuItem[],
  currentPath: string,
): string | null => {
  for (const item of items) {
    if (item.path === currentPath) {
      return item.key!;
    }
    if (item.children) {
      const childResult = findActiveMenuKey(item.children, currentPath);
      if (childResult) {
        return childResult;
      }
    }
  }
  return null;
};

// Parent menu key larini topish (submenu ochish uchun)
export const findParentKeys = (
  items: MenuItem[],
  targetKey: string,
  parents: string[] = [],
): string[] => {
  for (const item of items) {
    if (item.key === targetKey) {
      return parents;
    }
    if (item.children) {
      const result = findParentKeys(item.children, targetKey, [
        ...parents,
        item.key!,
      ]);
      if (result.length > 0) {
        return result;
      }
    }
  }
  return [];
};

// Menu filtering
export function filterData(
  data: MenuItem[],
  allowedKeys: string[],
): MenuItem[] {
  return data.reduce((acc: MenuItem[], item) => {
    if (item.key && allowedKeys.includes(item.key)) {
      const filteredItem: MenuItem = { ...item };
      if (item.children) {
        filteredItem.children = filterData(item.children, allowedKeys);
      }
      acc.push(filteredItem);
    }
    return acc;
  }, []);
}

/**
 * targetKey bo‘yicha children ga newChildren ni qo‘shish (rekursiv, immutable)
 */
export const insertChildrenByKey = (
  items: MenuItem[],
  targetKey: string,
): MenuItem[] => {
  return items.map((item) => {
    if (item.key === targetKey) {
      return { ...item };
    }
    if (item.children && item.children.length) {
      return {
        ...item,
        children: insertChildrenByKey(item.children, targetKey),
      };
    }
    return item;
  });
};
